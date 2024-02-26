import catchAsyncHandler from "../../utils/catchAsyncHandler";
import sendResponse from "../../utils/sendResponse";
import userServices from "./user.service";

const registerUser = catchAsyncHandler(async (req, res) => {
  const result = await userServices.registerUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Successfully Registered",
    data: result,
  });
});

const loginUser = catchAsyncHandler(async (req, res) => {
  const result = await userServices.loginUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Successfully Login",
    data: result,
  });
});

const userControllers = { registerUser, loginUser };
export default userControllers;
