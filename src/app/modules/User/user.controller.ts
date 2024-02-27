import config from "../../config";
import { ErrorType } from "../../constant/global.constant";
import AppError from "../../errors/AppError";
import catchAsyncHandler from "../../utils/catchAsyncHandler";
import sendResponse from "../../utils/sendResponse";
import userServices from "./user.service";

const registerUser = catchAsyncHandler(async (req, res) => {
  const result = await userServices.registerUserIntoDB(req.body);

  res.cookie("refresh_token", result.refresh_token, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Successfully Registered",
    data: {
      access_token: result.access_token,
    },
  });
});

const loginUser = catchAsyncHandler(async (req, res) => {
  const result = await userServices.loginUserIntoDB(req.body);

  res.cookie("refresh_token", result.refresh_token, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Login",
    data: {
      access_token: result.access_token,
    },
  });
});

const changePassword = catchAsyncHandler(async (req, res) => {
  const result = await userServices.changePassword({
    ...req.body,
    userId: req.user.id,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully change your password",
    data: result,
  });
});

const forgetPassword = catchAsyncHandler(async (req, res) => {
  const result = await userServices.forgetPassword(req.body.email);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Check your email. Send mail for forget password",
    data: result,
  });
});

const resetPassword = catchAsyncHandler(async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError(400, "headers token is required", ErrorType.server);
  }

  const result = await userServices.resetPassword({
    ...req.body,
    token: token,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password successfully reset",
    data: result,
  });
});

const userControllers = {
  registerUser,
  loginUser,
  changePassword,
  forgetPassword,
  resetPassword,
};
export default userControllers;
