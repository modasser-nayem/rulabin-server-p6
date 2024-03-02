import { z } from "zod";

const createBrandSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "name is required" })
      .min(2, { message: "Name can't be less then 2 character" }),
    icon: z
      .string({ required_error: "icon is required" })
      .min(1, { message: "Please provide brand icon url" })
      .optional(),
  }),
});

const updateBrandSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    icon: z.string().optional(),
  }),
});

const brandSchemasValidation = { createBrandSchema, updateBrandSchema };
export default brandSchemasValidation;
