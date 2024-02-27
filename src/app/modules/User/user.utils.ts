import bcrypt from "bcrypt";
import User from "./user.model";
import config from "../../config";
import { TAccessTokenPayload } from "./user.interface";
import jwt, { JwtPayload } from "jsonwebtoken";

export const generateUserId = async () => {
  let currentId = (0).toString();
  const lastUserId = await User.findOne({}, { id: 1 })
    .sort({ createdAt: -1 })
    .lean();

  if (lastUserId) {
    currentId = lastUserId.id;
  }

  const incrementId = (Number(currentId) + 1).toString().padStart(6, "0");

  return incrementId;
};

export const createHashPassword = async (plainText: string) => {
  const result = await bcrypt.hash(
    plainText,
    Number(config.BCRYPT_SALT_ROUNDS),
  );

  return result;
};

export const isPasswordMatch = async (plainText: string, hashText: string) => {
  return await bcrypt.compare(plainText, hashText);
};

export const createAccessToken = (
  payload: TAccessTokenPayload,
  expiresIn?: string,
) => {
  const result = jwt.sign(payload, config.JWT_ACCESS_SECRET as string, {
    expiresIn: expiresIn ? expiresIn : config.JWT_ACCESS_EXPIRES_IN,
  });

  return result;
};

export const createRefreshToken = (
  payload: TAccessTokenPayload,
  expiresIn?: string,
) => {
  const result = jwt.sign(payload, config.JWT_REFRESH_SECRET as string, {
    expiresIn: expiresIn ? expiresIn : config.JWT_REFRESH_EXPIRES_IN,
  });

  return result;
};

export const jwtVerify = (token: string, secret: string) => {
  const decode = jwt.verify(token, secret);

  return decode as JwtPayload;
};
