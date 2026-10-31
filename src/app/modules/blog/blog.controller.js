import { BlogServices } from "./blog.service.js";

const createBlog = async (req, res) => {
  try {
    const blogData = req.body;
    const result = await BlogServices.createBlog(blogData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create blog", message: error.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const { q } = req.query;
    const result = await BlogServices.getAllBlogs(q);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to get blogs", message: error.message });
  }
};

const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await BlogServices.getSingleBlog(id);
    if (!result) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to get blog", message: error.message });
  }
};

const clapBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body || {};
    const result = await BlogServices.clapBlog(id, action);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to clap story", message: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const commentData = req.body;
    const result = await BlogServices.addComment(id, commentData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to add comment", message: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const result = await BlogServices.updateBlog(id, updateData);
    if (!result) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to update blog", message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await BlogServices.deleteBlog(id);
    if (!result) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete blog", message: error.message });
  }
};

export const BlogController = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  clapBlog,
  addComment,
  updateBlog,
  deleteBlog,
};
