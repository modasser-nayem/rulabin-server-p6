import mongoose from "mongoose";
import { TErrorHandlerResponse } from "../types/global.types";
import { ErrorType } from "../constant/global.constant";

const castErrorhandler = (
  err: mongoose.Error.CastError,
): TErrorHandlerResponse => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]+)"[^"]*$/);

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];

  const error = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    statusCode: 400,
    errorType: ErrorType.validation,
    message: `Invalid ${extractedMessage} id`,
    error: error,
  };
};

export default castErrorhandler;
