import { Types } from "mongoose";
import { UserRole, UserStatus } from "./user.constant";

export type TUserRole = keyof typeof UserRole;
export type TUserStatus = keyof typeof UserStatus;

interface TUserAddress {
  country: string;
  city: string;
  state: string;
  pinCode: string;
  localArea: string;
}

export interface TUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: TUserRole;
  status: TUserStatus;
  image?: string;
  phoneNo: string;
  address?: TUserAddress;
}

export interface TRegisterUser {
  id: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface TLoginUser {
  email: string;
  password: string;
}

export interface TUpdateUserProfile {
  name?: string;
  email?: string;
  image?: string;
  phoneNo?: string;
  address?: TUserAddress;
}

export type TAccessTokenPayload = {
  id: Types.ObjectId;
  role: TUserRole;
};

export interface TChangePassword {
  userId: Types.ObjectId;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface TResetPassword {
  userId: Types.ObjectId;
  token: string;
  newPassword: string;
  confirmPassword: string;
}
