import { ErrorType } from "../../constant/global.constant";
import AppError from "../../errors/AppError";
import { TLoginUser, TRegisterUser } from "./user.interface";
import User from "./user.model";
import {
  createAccessToken,
  createHashPassword,
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

  const token = createAccessToken({
    id: result._id,
    role: result.role,
  });

  return { access_token: token };
};

const loginUserIntoDB = async (data: TLoginUser) => {
  const user = await User.findOne({ email: data.email });
  if (!user) {
    throw new AppError(400, `This email not have user`, ErrorType.validation);
  }

  if (!(await isPasswordMatch(data.password, user.password))) {
    throw new AppError(400, "Password does't match", ErrorType.validation);
  }

  const token = createAccessToken({
    id: user._id,
    role: user.role,
  });

  return { access_token: token };
};

const userServices = { registerUserIntoDB, loginUserIntoDB };
export default userServices;
