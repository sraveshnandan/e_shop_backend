import express from "express";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { expressMiddleware } from "@apollo/server/express4";
import mongoose from "mongoose";
import { resolvers, typeDefs } from "./graphql";
import { MongoDbUri, Port, Rate_Limit_Duration, Rate_limit } from "./config";
import { RateLimiterMemory } from "rate-limiter-flexible";

// Rate limiting middleware
const rateLimiter = new RateLimiterMemory({
  points: Number(Rate_limit),
  duration: Number(Rate_Limit_Duration),
});

//Creating an express app
const app = express();
app.use(express.json());

// Apply rate limiting to each request
app.use((req, res, next) => {
  rateLimiter
    .consume(req.ip)
    .then(() => next())
    .catch(() =>
      res.status(429).send("Limit exceeded, please try again in a minute.")
    );
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  console.log(`Connecting to Database.....`);
  mongoose
    .connect(MongoDbUri, { dbName: "e_shop" })
    .then(async (con) => {
      console.log(`📡 Databse is connected to : ${con.connection.host}`);
      console.log(`Starting GraphQl Server....`);
      await startStandaloneServer(server);
      // Use express middleware in Apollo Server
      app.use(
        "/graphql",
        expressMiddleware(server, {
          context: async ({ req, res }) => ({
            headers: req.headers,
          }),
        })
      );
      // starting the main server
      app.listen(Port, () => {
        console.log(
          `🔗 GraphQL Server is running on: http://localhost:${Port}/graphql`
        );
      });
    })
    .catch((error) =>
      console.log(`Unable to connect to the database due to : ${error.message}`)
    );
};

// Starting  graphql server

startServer();
