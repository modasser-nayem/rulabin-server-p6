/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorType } from "../constant/global.constant";
import { TErrorHandlerResponse } from "../types/global.types";

const duplicateErrorhandler = (err: any): TErrorHandlerResponse => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];

  const message = `${extractedMessage} is already exists`;

  return {
    statusCode: 400,
    errorType: ErrorType.validation,
    message: message,
    error: null,
  };
};

export default duplicateErrorhandler;
