import Blog from "./blog.model";

// Create Blog
const createBlog = async (blogData) => {
  const blog = await Blog.create(blogData);
  return blog;
};

// Get All Blogs
const getAllBlogs = async () => {
  const blogs = await Blog.find();
  return blogs;
};

// Get Single Blog
const getSingleBlog = async (id) => {
  const blog = await Blog.findById(id);
  return blog;
};

// Update Blog
const updateBlog = async (id, updateData) => {
  const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return updatedBlog;
};

// Delete Blog
const deleteBlog = async (id) => {
  const deletedBlog = await Blog.findByIdAndDelete(id);
  return deletedBlog;
};

export const BlogServices = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
