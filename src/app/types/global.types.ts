import { ErrorType } from "../constant/global.constant";

type TErrorTypeKey = keyof typeof ErrorType;
export type TErrorType = (typeof ErrorType)[TErrorTypeKey];

export type TErrorHandlerResponse = {
  statusCode: number;
  errorType: TErrorType;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
};
