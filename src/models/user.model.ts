import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  full_name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  addressess: [
    {
      appartment_building_no: number;
      village_locality: string;
      landmark: string;
      city: string;
      district: string;
      state: string;
      pin_code: number;
      contact_no: number;
    }
  ];
  orders: [
    {
      order_id: string;
    }
  ];
  wishlist: [
    {
      product_id: string;
    }
  ];
  cart: [
    {
      product_id: string;
    }
  ];
}
const UserSchema = new Schema<IUser>(
  {
    full_name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    addressess: [
      {
        appartment_building_no: Number,
        village_locality: String,
        landmark: String,
        city: String,
        district: String,
        state: String,
        pin_code: Number,
        contact_no: Number,
      },
    ],
    cart: [
      {
        product_id: String,
      },
    ],
    wishlist: [{ product_id: String }],
    orders: [
      {
        order_id: String,
      },
    ],
  },
  { timestamps: true }
);

const User = model("User", UserSchema);

export { User };
