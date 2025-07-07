import { BlogServices } from "./blog.service.js";

// Create Blog
const createBlog = async (req, res) => {
  try {
    const newBlog = req.body;
    const result = await BlogServices.createBlog(newBlog);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ error: "Failed to create blog" });
  }
};

// Get All Blogs
const getAllBlogs = async (req, res) => {
  try {
    const result = await BlogServices.getAllBlogs();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch blogs" });
  }
};

// Get Single Blog
const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await BlogServices.getSingleBlog(id);

    if (!result) {
      return res.status(404).send({ error: "Blog not found" });
    }

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch blog" });
  }
};

// Update Blog
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await BlogServices.updateBlog(id, updateData);

    if (!result) {
      return res.status(404).send({ error: "Blog not found" });
    }

    res.status(200).send({ message: "Blog updated successfully" });
  } catch (error) {
    res.status(500).send({ error: "Failed to update blog" });
  }
};

// Delete Blog
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await BlogServices.deleteBlog(id);

    if (!result) {
      return res.status(404).send({ error: "Blog not found" });
    }

    res.status(200).send({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: "Failed to delete blog" });
  }
};

export const BlogController = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
