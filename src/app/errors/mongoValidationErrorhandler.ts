import mongoose from "mongoose";
import { TErrorHandlerResponse } from "../types/global.types";
import { ErrorType } from "../constant/global.constant";

const mongoValidationErrorhandler = (
  err: mongoose.Error.ValidationError,
): TErrorHandlerResponse => {
  const error = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  return {
    statusCode: 400,
    errorType: ErrorType.validation,
    message: error?.[0]?.message,
    error,
  };
};

export default mongoValidationErrorhandler;
