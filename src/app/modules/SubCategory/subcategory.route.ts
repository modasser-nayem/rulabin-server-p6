import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../User/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import subcategorySchemasValidation from "./subcategory.validation";
import subcategoryControllers from "./subcategory.controller";

const router = Router();

// create new category
router.post(
  "/",
  auth(UserRole.admin),
  validateRequest(subcategorySchemasValidation.createSubcategorySchema),
  subcategoryControllers.createNewSubcategory,
);

// get all category
router.get("/:category", subcategoryControllers.getAllSubcategoryByCategory);

// update category
router.put(
  "/:id",
  auth(UserRole.admin),
  validateRequest(subcategorySchemasValidation.updateSubcategorySchema),
  subcategoryControllers.updateSubcategory,
);

// delete category
router.delete(
  "/:id",
  auth(UserRole.admin),
  subcategoryControllers.deleteSubcategory,
);

const subcategoryRoutes = router;
export default subcategoryRoutes;
