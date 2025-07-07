import express from "express";
import { BlogController } from "./blog.controller";

const router = express.Router();

router.post("/blogs", BlogController.createBlog);
router.get("/blogs", BlogController.getAllBlogs);
router.get("/blogs/:id", BlogController.getSingleBlog);
router.patch("/blogs/:id", BlogController.updateBlog);
router.delete("/blogs/:id", BlogController.deleteBlog);

export const BlogRoutes = router;
