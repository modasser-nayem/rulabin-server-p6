import mongoose from "mongoose";
import { TErrorHandlerResponse } from "../types/global.types";
import { ErrorType } from "../constant/global.constant";

const castErrorhandler = (
  err: mongoose.Error.CastError,
): TErrorHandlerResponse => {
  const error = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    statusCode: 400,
    errorType: ErrorType.validation,
    message: err.message,
    error: error,
  };
};

export default castErrorhandler;
