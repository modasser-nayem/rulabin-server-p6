import { Router } from "express";
import userRoutes from "../modules/User/user.route";
import brandRoutes from "../modules/Brand/brand.route";

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
];

allRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
