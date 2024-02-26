import { Router } from "express";
import userControllers from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import userSchemasValidation from "./user.validation";

const router = Router();

// register user
router.post(
  "/register",
  validateRequest(userSchemasValidation.registerUserSchema),
  userControllers.registerUser,
);

// login user

// get user

// update user

// update user role

// change password

// forget password

const userRoutes = router;
export default userRoutes;
