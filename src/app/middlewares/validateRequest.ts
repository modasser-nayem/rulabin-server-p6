import { AnyZodObject } from "zod";
import catchAsyncHandler from "../utils/catchAsyncHandler";

const validateRequest = (schema: AnyZodObject) => {
  return catchAsyncHandler(async (req, _res, next) => {
    await schema.parseAsync({
      body: req.body,
    });

    next();
  });
};

export default validateRequest;
