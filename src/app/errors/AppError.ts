import { TErrorType } from "../types/global.types";

class AppError extends Error {
  public statusCode: number;
  public errorType: TErrorType;
  constructor(
    statusCode: number,
    message: string,
    errorType: TErrorType,
    stack = null,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorType = errorType;
    this.message = message;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
