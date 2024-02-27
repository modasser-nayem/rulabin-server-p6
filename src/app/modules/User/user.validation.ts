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
      message: "Confirm Password dose't match!",
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

const changePasswordSchema = z.object({
  body: z
    .object({
      oldPassword: z
        .string({ required_error: "oldPassword is required" })
        .min(1, { message: "Please provide your old password" }),
      newPassword: z
        .string({ required_error: "newPassword is required" })
        .min(1, { message: "Please provide your new password" }),
      confirmPassword: z
        .string({ required_error: "confirmPassword is required" })
        .min(1, { message: "Please provide confirm password" }),
    })
    .refine((value) => value.newPassword === value.confirmPassword, {
      message: "Confirm Password dose't match!",
    }),
});

const forgetPasswordSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "email is required" })
      .email({ message: "Invalid email address" }),
  }),
});

const resetPasswordSchema = z.object({
  body: z
    .object({
      userId: z
        .string({ required_error: "userId is required" })
        .refine((value) => value !== "", { message: "userId is required" }),
      newPassword: z
        .string({ required_error: "newPassword is required" })
        .min(1, { message: "Please provide your new password" }),
      confirmPassword: z
        .string({ required_error: "confirmPassword is required" })
        .min(1, { message: "Please provide confirm password" }),
    })
    .refine((value) => value.newPassword === value.confirmPassword, {
      message: "Confirm Password dose't match!",
    }),
});

const userSchemasValidation = {
  registerUserSchema,
  loginUserSchema,
  changePasswordSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
};
export default userSchemasValidation;
