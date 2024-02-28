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
  auth(),
  validateRequest(userSchemasValidation.changePasswordSchema),
  userControllers.changePassword,
);

// forget password
router.post(
  "/forget-password",
  validateRequest(userSchemasValidation.forgetPasswordSchema),
  userControllers.forgetPassword,
);

// reset password
router.post(
  "/reset-password",
  validateRequest(userSchemasValidation.resetPasswordSchema),
  userControllers.resetPassword,
);

// get user profile
router.get("/profile", auth(), userControllers.getUserProfile);

// update user profile
router.put(
  "/profile",
  auth(),
  validateRequest(userSchemasValidation.updateUserProfileSchema),
  userControllers.updateUserProfile,
);

// update user status
router.patch(
  "/status",
  auth("admin"),
  validateRequest(userSchemasValidation.updateUserStatusSchema),
  userControllers.updateUserStatus,
);

// update user role
router.patch(
  "/role",
  auth("admin"),
  validateRequest(userSchemasValidation.updateUserRoleSchema),
  userControllers.updateUserRole,
);

const userRoutes = router;
export default userRoutes;
