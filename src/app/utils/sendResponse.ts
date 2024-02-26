/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";

type TSendResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  data: any;
  meta?: any;
};

const sendResponse = (res: Response, data: TSendResponse) => {
  res.status(data.statusCode).json({
    code: data.statusCode,
    success: data.success,
    message: data.message,
    data: data.data,
    meta: data.meta,
  });
};

export default sendResponse;
