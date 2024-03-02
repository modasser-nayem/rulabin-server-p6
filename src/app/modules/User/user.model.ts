import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import { UserRole, UserStatus } from "./user.constant";

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      select: 0,
    },
    role: {
      type: String,
      enum: Object.entries(UserRole).map((role) => role[0]),
      default: "customer",
    },
    status: {
      type: String,
      enum: Object.entries(UserStatus).map((status) => status[0]),
      default: "unblock",
    },
    image: {
      type: String,
    },
    phoneNo: {
      type: String,
    },
    address: {
      country: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      pinCode: {
        type: String,
      },
      localArea: {
        type: String,
      },
    },
  },
  { timestamps: true },
);

const User = model<TUser>("User", userSchema);
export default User;
