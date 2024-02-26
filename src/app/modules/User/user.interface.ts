import { UserRole, UserStatus } from "./user.constant";

type TUserRole = keyof typeof UserRole;
type TUserStatus = keyof typeof UserStatus;

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