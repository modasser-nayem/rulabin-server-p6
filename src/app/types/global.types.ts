import { ErrorType } from "../constant/global.constant";

type TErrorTypeKey = keyof typeof ErrorType;
export type TErrorType = (typeof ErrorType)[TErrorTypeKey];
