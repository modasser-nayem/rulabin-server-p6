import config from "../../config";
import { ErrorType } from "../../constant/global.constant";
import AppError from "../../errors/AppError";
import sendEmail from "../../utils/sendEmail";
import { UserStatus } from "./user.constant";
import {
  TChangePassword,
  TLoginUser,
  TRegisterUser,
  TResetPassword,
} from "./user.interface";
import User from "./user.model";
import {
  createAccessToken,
  createHashPassword,
  createRefreshToken,
  generateUserId,
  isPasswordMatch,
  jwtVerify,
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
    throw new AppError(
      400,
      "This email not have any account",
      ErrorType.validation,
    );
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

const forgetPassword = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(
      400,
      "This email not have any account",
      ErrorType.forbidden,
    );
  }

  if (user.status === UserStatus.block) {
    throw new AppError(400, "Your account is blocked", ErrorType.forbidden);
  }

  const accessToken = createAccessToken(
    {
      id: user._id,
      role: user.role,
    },
    "10m",
  );

  const resetPassUiLink = `${config.RESET_PASS_UI_LINK}/?id=${user._id}&token=${accessToken}`;

  sendEmail(email, resetPassUiLink);
  return null;
};

const resetPassword = async (data: TResetPassword) => {
  const user = await User.findById(data.userId);
  if (!user) {
    throw new AppError(
      403,
      "You do not have the required permission to access that particular page",
      ErrorType.forbidden,
    );
  }

  if (user.status === UserStatus.block) {
    throw new AppError(400, "Your account is blocked", ErrorType.forbidden);
  }

  const decode = jwtVerify(data.token, config.JWT_ACCESS_SECRET as string);

  if (decode.id !== data.userId) {
    throw new AppError(
      403,
      "You do not have the required permission to access that particular page",
      ErrorType.forbidden,
    );
  }

  if (data.newPassword !== data.confirmPassword) {
    throw new AppError(
      400,
      "Confirm password does't match",
      ErrorType.validation,
    );
  }

  const newHashedPassword = await createHashPassword(data.newPassword);

  await User.findByIdAndUpdate(user._id, { password: newHashedPassword });

  return null;
};

const userServices = {
  registerUserIntoDB,
  loginUserIntoDB,
  changePassword,
  forgetPassword,
  resetPassword,
};
export default userServices;
