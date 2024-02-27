import { ErrorType } from "../../constant/global.constant";
import AppError from "../../errors/AppError";
import { UserStatus } from "./user.constant";
import { TChangePassword, TLoginUser, TRegisterUser } from "./user.interface";
import User from "./user.model";
import {
  createAccessToken,
  createHashPassword,
  createRefreshToken,
  generateUserId,
  isPasswordMatch,
} from "./user.utils";

const registerUserIntoDB = async (data: TRegisterUser) => {
  if (data.password !== data.confirmPassword) {
    throw new AppError(400, "Password does't match", ErrorType.validation);
  }

  if (await User.findOne({ email: data.email })) {
    throw new AppError(
      400,
      `${data.email} is already exist`,
      ErrorType.validation,
    );
  }

  data.id = await generateUserId();
  data.password = await createHashPassword(data.password);
  const result = await User.create(data);

  const accessToken = createAccessToken({
    id: result._id,
    role: result.role,
  });

  const refreshToken = createRefreshToken({
    id: result._id,
    role: result.role,
  });

  return { access_token: accessToken, refresh_token: refreshToken };
};

const loginUserIntoDB = async (data: TLoginUser) => {
  const user = await User.findOne({ email: data.email }).select("+password");
  if (!user) {
    throw new AppError(400, `This email not have user`, ErrorType.validation);
  }

  if (!(await isPasswordMatch(data.password, user.password))) {
    throw new AppError(400, "Password is wrong!", ErrorType.validation);
  }

  if (user.status === UserStatus.block) {
    throw new AppError(400, "Your account is blocked", ErrorType.forbidden);
  }

  const accessToken = createAccessToken({
    id: user._id,
    role: user.role,
  });

  const refreshToken = createRefreshToken({
    id: user._id,
    role: user.role,
  });

  return { access_token: accessToken, refresh_token: refreshToken };
};

const changePassword = async (data: TChangePassword) => {
  const user = await User.findById(data.userId).select("+password");
  if (!user) {
    throw new AppError(
      403,
      `You do not have the required permission to access that particular page`,
      ErrorType.forbidden,
    );
  }

  if (user.status === UserStatus.block) {
    throw new AppError(400, "Your account is blocked", ErrorType.forbidden);
  }

  if (!(await isPasswordMatch(data.oldPassword, user.password))) {
    throw new AppError(400, "Old Password is wrong!", ErrorType.validation);
  }

  if (data.newPassword !== data.confirmPassword) {
    throw new AppError(
      400,
      "Confirm password does't match",
      ErrorType.validation,
    );
  }

  const hashPassword = await createHashPassword(data.newPassword);

  await User.findByIdAndUpdate(user._id, {
    password: hashPassword,
  });

  return null;
};

const userServices = { registerUserIntoDB, loginUserIntoDB, changePassword };
export default userServices;
