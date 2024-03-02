import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import productSchemasValidation from "./product.validation";
import productControllers from "./product.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../User/user.constant";

const router = Router();

// create new product
router.post(
  "/",
  auth(UserRole.admin, UserRole.seller),
  validateRequest(productSchemasValidation.createNewProduct),
  productControllers.createNewProduct,
);

// get all product for users
router.get("/", productControllers.getAllProductForUsers);

// get all product for admin
router.get(
  "/admin",
  auth(UserRole.admin),
  productControllers.getAllProductForAdmin,
);

// get all product for seller
router.get(
  "/seller",
  auth(UserRole.seller),
  productControllers.getAllProductForSeller,
);

// get single product
router.get("/:id", productControllers.getSingleProduct);

// update product
router.put(
  "/:id",
  auth(UserRole.admin, UserRole.seller),
  validateRequest(productSchemasValidation.updateProduct),
  productControllers.updateProductIntoDB,
);

// update product activation
router.patch(
  "/:id",
  auth(UserRole.admin),
  productControllers.updateProductActivation,
);

// delete product
router.delete(
  "/:id",
  auth(UserRole.admin, UserRole.seller),
  productControllers.deleteProductIntoDB,
);

const productRoutes = router;
export default productRoutes;
