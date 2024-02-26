import { ErrorRequestHandler } from "express";
import config from "../config";
import { TErrorType } from "../types/global.types";
import { ErrorType } from "../constant/global.constant";
import { ZodError } from "zod";
import zodErrorhandler from "../errors/zodErrorhandler";
import duplicateErrorhandler from "../errors/duplicateErrorhandler";
import AppError from "../errors/AppError";
import mongoValidationErrorhandler from "../errors/mongoValidationErrorhandler";
import castErrorhandler from "../errors/castErrorhandler";

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

    // Mongoose Validation Error
  } else if (err?.name === "ValidationError") {
    const newError = mongoValidationErrorhandler(err);
    statusCode = newError.statusCode;
    errorType = newError.errorType;
    message = newError.message;
    error = newError.error;

    // Mongoose Cast Error
  } else if (err?.name === "CastError") {
    const newError = castErrorhandler(err);
    statusCode = newError.statusCode;
    errorType = newError.errorType;
    message = newError.message;
    error = newError.error;

    // Mongoose Duplicate error
  } else if (err.code === 11000) {
    const newError = duplicateErrorhandler(err);
    statusCode = newError.statusCode;
    errorType = newError.errorType;
    message = newError.message;
    error = newError.error;

    // Custom App Error
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    errorType = err?.errorType;
    message = err?.message;
    error = null;

    // Default App Error
  } else if (err instanceof Error) {
    statusCode = 500;
    errorType = ErrorType.server;
    message = err.message;
    error = null;
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
