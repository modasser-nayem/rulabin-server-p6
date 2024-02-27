import { ErrorType } from "../constant/global.constant";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/User/user.interface";
import catchAsyncHandler from "../utils/catchAsyncHandler";
import config from "../config";
import User from "../modules/User/user.model";
import { UserStatus } from "../modules/User/user.constant";
import { jwtVerify } from "../modules/User/user.utils";

const auth = (...roles: TUserRole[]) => {
  return catchAsyncHandler(async (req, res, next) => {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      throw new AppError(
        401,
        "You are unauthorize user, please login",
        ErrorType.authorization,
      );
    }

    const decode = jwtVerify(accessToken, config.JWT_ACCESS_SECRET as string);

    const user = await User.findById(decode.id);
    if (!user) {
      throw new AppError(
        401,
        "You are not authorize user",
        ErrorType.authorization,
      );
    }

    if (user.status === UserStatus.block) {
      throw new AppError(403, "Your account is blocked", ErrorType.forbidden);
    }

    if (roles.length && !roles.includes(user.role)) {
      throw new AppError(
        403,
        "You do not have the required permission to access that particular page",
        ErrorType.forbidden,
      );
    }

    req.user = decode;

    next();
  });
};

export default auth;
