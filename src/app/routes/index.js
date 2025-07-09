import { Router } from "express";
import { BlogRoutes } from "../modules/blog/blog.route.js";
import { WishlistRoutes } from "../modules/wishlist/wishlist.route.js";


const router = Router();
const moduleRoutes = [
  {
    path: "/blogs",
    route: BlogRoutes,
  },
  {
    path: "/wishlist",
    route: WishlistRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
