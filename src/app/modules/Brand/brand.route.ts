import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../User/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import brandSchemasValidation from "./brand.validation";
import brandControllers from "./brand.controller";

const router = Router();

// create new brand
router.post(
  "/",
  auth(UserRole.admin),
  validateRequest(brandSchemasValidation.createBrandSchema),
  brandControllers.createNewBrand,
);

// get all brand
router.get("/", brandControllers.getAllBrand);

// update brand
router.put(
  "/:id",
  auth(UserRole.admin),
  validateRequest(brandSchemasValidation.updateBrandSchema),
  brandControllers.updateBrand,
);

// delete brand
router.delete("/:id", auth(UserRole.admin), brandControllers.deleteBrand);

const brandRoutes = router;
export default brandRoutes;
