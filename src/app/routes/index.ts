import { Router } from "express";
import userRoutes from "../modules/User/user.route";
import brandRoutes from "../modules/Brand/brand.route";
import categoryRoutes from "../modules/Category/category.route";
import subcategoryRoutes from "../modules/SubCategory/subcategory.route";

const router = Router();

const allRoutes = [
  {
    path: "/auth",
    route: userRoutes,
  },
  {
    path: "/brand",
    route: brandRoutes,
  },
  {
    path: "/category",
    route: categoryRoutes,
  },
  {
    path: "/subcategory",
    route: subcategoryRoutes,
  },
];

allRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
