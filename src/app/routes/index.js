import { Router } from "express";
import { BlogRoutes } from "../modules/blog/blog.route.js";
import { WishlistRoutes } from "../modules/wishlist/wishlist.route.js";
import { NewsRoutes } from "../modules/news/news.route.js";

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
  {
    path: "/news",
    route: NewsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
