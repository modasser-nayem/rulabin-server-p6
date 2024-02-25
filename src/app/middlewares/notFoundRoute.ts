import { Request, Response } from "express";
import { ErrorType } from "../constant/global.constant";

const notFoundRoute = (_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    errorType: ErrorType.notfound,
    message:
      "Sorry, you are request on wrong url. Please try to request a valid url",
    error: {},
  });
};

export default notFoundRoute;
