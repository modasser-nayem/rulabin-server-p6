import { z } from "zod";

const registerUserSchema = z.object({
  body: z
    .object({
      name: z
        .string({ required_error: "name is required" })
        .min(4, { message: "Name can't be less then 4 character" })
        .max(30, { message: "Name can't be more than 30 character" }),
      email: z
        .string({ required_error: "email is required" })
        .email({ message: "Invalid email address" }),
      password: z
        .string({ required_error: "password is required" })
        .min(6, { message: "Password can't be less then 6 character" })
        .max(8, { message: "Password can't be more than 8 character" }),
      confirmPassword: z
        .string({ required_error: "confirmPassword is required" })
        .min(1, { message: "Please provide confirm password" }),
    })
    .refine((value) => value.password === value.confirmPassword, {
      message: "Password dose't match!",
    }),
});

const loginUserSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string({ required_error: "password is required" })
      .min(1, { message: "Please provide your password" }),
  }),
});

const userSchemasValidation = { registerUserSchema, loginUserSchema };
export default userSchemasValidation;
