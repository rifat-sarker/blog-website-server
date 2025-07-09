import express from "express";
import {BlogController} from './blog.controller.js'


const router = express.Router();

router.post("/", BlogController.createBlog);
router.get("/", BlogController.getAllBlogs);
router.get("/:id", BlogController.getSingleBlog);
router.patch("/:id", BlogController.updateBlog);
router.delete("/:id", BlogController.deleteBlog);

export const BlogRoutes = router;
