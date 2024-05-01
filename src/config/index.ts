import dotenv from "dotenv";
dotenv.config();

const Port = process.env.PORT;
const MongoDbUri = process.env.MONGODB_URI_LOCAL;
const StatusSecret = process.env.STATUS_SECRET;
const JWT_SECRET = process.env.JWT_PRIVATE_KEY;
const ImakeKit_url_endpoint = process.env.IMAGEKIT_URL;
const ImageKit_public_key = process.env.IMAGEKIT_PUBLIC_KEY;
const ImageKit_private_key = process.env.IMAGEKIT_PRIVATE_KEY;
const cloudinary_cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinary_api_key = process.env.CLOUDINARY_API_KEY;
const cloudinary_api_secret = process.env.CLOUDINARY_API_SECRET;
const seed_secret = process.env.SEED_SECRET;
const Rate_limit = process.env.RATE_LIMIT;
const Rate_Limit_Duration = process.env.RATE_LIMIT_DURATION;

export {
  Port,
  MongoDbUri,
  StatusSecret,
  JWT_SECRET,
  ImakeKit_url_endpoint,
  ImageKit_public_key,
  ImageKit_private_key,
  cloudinary_cloud_name,
  cloudinary_api_key,
  cloudinary_api_secret,
  seed_secret,
  Rate_limit,
  Rate_Limit_Duration,
};
