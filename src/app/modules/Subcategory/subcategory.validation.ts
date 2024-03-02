import { z } from "zod";

const createSubcategorySchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "name is required" })
      .min(2, { message: "Name can't be less then 2 character" }),
    icon: z
      .string({ required_error: "icon is required" })
      .min(1, { message: "Please provide subcategory icon url" })
      .optional(),
    category: z
      .string({ required_error: "category is required" })
      .min(1, { message: "Please provide category" }),
  }),
});

const updateSubcategorySchema = z.object({
  body: z.object({
    name: z.string().optional(),
    icon: z.string().optional(),
    category: z.string().optional(),
  }),
});

const subcategorySchemasValidation = {
  createSubcategorySchema,
  updateSubcategorySchema,
};
export default subcategorySchemasValidation;
