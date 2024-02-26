import { ErrorType } from "../../constant/global.constant";
import AppError from "../../utils/AppError";
import { TRegisterUser } from "./user.interface";
import User from "./user.model";
import { generateUserId } from "./user.utils";

const registerUserIntoDB = async (data: TRegisterUser) => {
  if (data.password !== data.confirmPassword) {
    throw new AppError(400, "Password does't match", ErrorType.validation);
  }

  data.id = await generateUserId();
  await User.create(data);

  return null;
};

const userServices = { registerUserIntoDB };
export default userServices;
