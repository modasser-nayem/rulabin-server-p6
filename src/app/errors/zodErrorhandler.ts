import { ZodError } from "zod";
import { TErrorHandlerResponse } from "../types/global.types";
import { ErrorType } from "../constant/global.constant";

const zodErrorhandler = (err: ZodError): TErrorHandlerResponse => {
  const error = err.issues.map((issue) => ({
    path: issue.path[issue.path.length - 1],
    message: issue.message,
  }));

  const message = err.issues[0].message;

  return {
    statusCode: 400,
    errorType: ErrorType.validation,
    message,
    error,
  };
};

export default zodErrorhandler;
