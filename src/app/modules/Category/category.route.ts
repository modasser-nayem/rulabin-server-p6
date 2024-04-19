import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../User/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import categorySchemasValidation from "./category.validation";
import categoryControllers from "./category.controller";

const router = Router();

// create new category
router.post(
  "/",
  auth(UserRole.admin),
  validateRequest(categorySchemasValidation.createCategorySchema),
  categoryControllers.createNewCategory,
);

// get all category
router.get("/", categoryControllers.getAllCategory);

// get single category
router.get("/:id", auth(UserRole.admin), categoryControllers.getSingleCategory);

// update category
router.put(
  "/:id",
  auth(UserRole.admin),
  validateRequest(categorySchemasValidation.updateCategorySchema),
  categoryControllers.updateCategory,
);

// delete category
router.delete("/:id", auth(UserRole.admin), categoryControllers.deleteCategory);

const categoryRoutes = router;
export default categoryRoutes;
