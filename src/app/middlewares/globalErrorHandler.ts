import { ErrorRequestHandler } from "express";
import config from "../config";
import { TErrorType } from "../types/global.types";
import { ErrorType } from "../constant/global.constant";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars, @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err: any, _req, res, next) => {
  const statusCode = 500;
  const message = "Something went wrong!";
  const errorType: TErrorType = ErrorType.server;
  const error = err;

  res.status(statusCode).json({
    code: statusCode,
    success: false,
    message: message,
    errorType: errorType,
    error: error,
    stack: config.NODE_ENV === "development" ? error?.stack : null,
  });
};

export default globalErrorHandler;
