import {
  LoginUserService,
  RegisterUserService,
  UpdateUserProfileService,
  sendOtpService,
  sendProfileService,
} from "../service";
import { StatusInfo } from "../utils";

export const resolvers = {
  Query: {
    // system status check
    status: async (_, { secret }) => {
      return StatusInfo(secret);
    },
    sendOtp: async (_, { email }) => {
      return await sendOtpService(email);
    },
    login: async (_, { data }) => {
      return await LoginUserService(data);
    },
    profile: async (_, {}, context) => {
      return await sendProfileService(context.headers);
    },
  },
  Mutation: {
    createUser: async (_, { data }) => {
      return await RegisterUserService(data);
    },
    updateProfile: async (_, { data }, context) => {
      const token = context.headers.token;
      const payload = {
        ...data,
        token,
      };
      return await UpdateUserProfileService(payload);
    },
    
  },
};
