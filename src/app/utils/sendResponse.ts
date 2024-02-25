/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";

type TSendResponse = {
  res: Response;
  data: {
    statusCode: number;
    success: boolean;
    message: string;
    data: any;
    meta?: any;
  };
};

const sendResponse = (data: TSendResponse) => {
  const responseData = data.data;
  data.res.status(responseData.statusCode).json({
    code: responseData.statusCode,
    success: responseData.success,
    message: responseData.message,
    data: responseData.data,
    meta: responseData.meta,
  });
};

export default sendResponse;
