import { GraphQLError } from "graphql";
import { sendEmail } from "../lib";
import { GenerateOtp } from "../utils";
import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";
import { compareSync, hashSync } from "bcrypt";
import { IUser, User } from "../models/user.model";

// Service to send OTP to user email
const sendOtpService = async (email: string) => {
  try {
    const otp = GenerateOtp();
    const status = await sendEmail(email, "OTP VERIFICATION", otp);
    if (status) {
      return otp;
    } else {
      return new GraphQLError("Something went wrong, unable to send email");
    }
  } catch (error) {
    return new GraphQLError(error.message);
  }
};

//Service to decode JWT Token

const VerifyToken = async (token: string) => {
  try {
    if (token || token !== "") {
      let decode = jwt.verify(token, JWT_SECRET);
      if (decode) {
        const data = JSON.stringify(decode);
        const id = JSON.parse(data)._id;
        let user = await User.findById(id);
        if (!user || user === undefined) {
          return new GraphQLError(
            "Token invalid or expired, Please login again."
          );
        }
        return user;
      } else {
        return new GraphQLError("Invalid or expired token.");
      }
    }
  } catch (error) {
    return new GraphQLError(error.message);
  }
};

//Service to send User Profile
const sendProfileService = async (context: any) => {
  try {
    const token = context.token;
    const user = await VerifyToken(token);
    return user;
  } catch (error) {
    return new GraphQLError(error.message);
  }
};

// Service to create User account

const RegisterUserService = async (data: {
  full_name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
}) => {
  try {
    let { full_name, email, password, avatar } = data;
    if (avatar === undefined || avatar === null) {
      avatar = {
        public_id: "sample_id",
        url: "https://cdn-icons-png.flaticon.com/512/1458/1458201.png",
      };
    }
    const hashedPassword = hashSync(password, 10);
    const newUserData = {
      full_name,
      email,
      password: hashedPassword,
      avatar,
    };
    const user = await User.create(newUserData);
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "30d" });

    const response = {
      message: "Account created successfully.",
      userData: user,
      token: token,
    };
    return response;
  } catch (error) {
    return new GraphQLError(error.message);
  }
};

// Service to login user account
const LoginUserService = async (data: { email: string; password: string }) => {
  try {
    const { email, password } = data;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return new GraphQLError("Invalid email, No account found.");
    }

    const isPasswordMatched = compareSync(password, user.password);
    if (!isPasswordMatched) {
      return new GraphQLError("Incorrect Password.");
    }
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "30d" });
    const response = {
      message: `Welcome back, Mr.${user.full_name} `,
      userData: user,
      token,
    };
    return response;
  } catch (error) {
    return new GraphQLError(error.message);
  }
};

// Service to update user account

const UpdateUserProfileService = async (data: {
  full_name?: string;
  avatar?: {
    public_id?: string;
    url?: string;
  };
  email: string;
  token: string;
}) => {
  try {
    const { token, full_name, avatar, email } = data;
    const user: any = await VerifyToken(token);
    const updateData = {
      full_name,
      email,
      avatar,
    };
    const updatedUser = await User.findByIdAndUpdate(
      { _id: user._id },
      { ...updateData },
      { new: true }
    );
    return {
      message: "Profile updated successfully.",
      userData: updatedUser,
    };
  } catch (error) {
    return new GraphQLError(error.message);
  }
};
// Service to reset user password

//Service to add address

export {
  sendOtpService,
  sendProfileService,
  RegisterUserService,
  LoginUserService,
  UpdateUserProfileService,
};
