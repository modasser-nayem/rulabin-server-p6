import { z } from "zod";

const createNewProduct = z.object({
  body: z.object({
    title: z
      .string({ required_error: "title is required" })
      .min(1, { message: "Please provide title" }),
    model: z
      .string({ required_error: "model is required" })
      .min(1, { message: "Please provide model" }),
    price: z
      .number({ required_error: "price is required" })
      .min(1, { message: "price can't be a negative number" }),
    quantity: z
      .number({ required_error: "quantity is required" })
      .min(1, { message: "Quantity can't be a negative number" }),
    image: z
      .string({ required_error: "image is required" })
      .min(1, { message: "Please provide image" }),
    description: z
      .string({ required_error: "description is required" })
      .min(1, { message: "Please provide description" }),
    brand: z
      .string({ required_error: "brand is required" })
      .min(1, { message: "Please provide brand" }),
    category: z
      .string({ required_error: "category is required" })
      .min(1, { message: "Please provide category" }),
    subcategory: z.string().optional(),
  }),
});

const updateProduct = z.object({
  body: z.object({
    title: z.string().optional(),
    model: z.string().optional(),
    price: z
      .number()
      .min(1, { message: "price can't be a negative number" })
      .optional(),
    quantity: z
      .number()
      .min(1, { message: "Quantity can't be a negative number" })
      .optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    brand: z.string().optional(),
    category: z.string().optional(),
    subcategory: z.string().optional(),
  }),
});

const productSchemasValidation = { createNewProduct, updateProduct };
export default productSchemasValidation;
