import { Router } from "express";
import { BlogRoutes } from "../app/modules/blog/blog.route";

const router = Router();
const moduleRoutes = [
  {
    path: "/blogs",
    route: BlogRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
