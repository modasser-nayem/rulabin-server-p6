import { Router } from "express";
import userRoutes from "../modules/User/user.route";

const router = Router();

const allRoutes = [
  {
    path: "/auth",
    route: userRoutes,
  },
];

allRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
