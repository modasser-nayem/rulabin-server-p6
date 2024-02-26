import { ErrorRequestHandler } from "express";
import config from "../config";
import { TErrorType } from "../types/global.types";
import { ErrorType } from "../constant/global.constant";
import { ZodError } from "zod";
import zodErrorhandler from "../errors/zodErrorhandler";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars, @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err: any, _req, res, next) => {
  let statusCode = 500;
  let errorType: TErrorType = ErrorType.server;
  let message = "Something went wrong!";
  let error = err;

  // Zod Error
  if (err instanceof ZodError) {
    const newError = zodErrorhandler(err);
    statusCode = newError.statusCode;
    errorType = newError.errorType;
    message = newError.message;
    error = newError.error;
  }

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
