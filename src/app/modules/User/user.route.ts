import { Router } from "express";
import userControllers from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import userSchemasValidation from "./user.validation";
import auth from "../../middlewares/auth";

const router = Router();

// register user
router.post(
  "/register",
  validateRequest(userSchemasValidation.registerUserSchema),
  userControllers.registerUser,
);

// login user
router.post(
  "/login",
  validateRequest(userSchemasValidation.loginUserSchema),
  userControllers.loginUser,
);

// change password
router.post(
  "/change-password",
  auth("customer", "seller"),
  validateRequest(userSchemasValidation.changePasswordSchema),
  userControllers.changePassword,
);

// forget password

// get user

// update user

// update user role

const userRoutes = router;
export default userRoutes;
