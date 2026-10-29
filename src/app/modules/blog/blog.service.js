import Blog from "./blog.model.js";
import { cache } from "../../utils/cache.js";
import { SEED_ESSAYS } from "./blog.constants.js";

// In-memory runtime store fallback
let inMemoryBlogs = [...SEED_ESSAYS];

// Create Blog & Invalidate Cache
const createBlog = async (blogData) => {
  try {
    const blog = await Blog.create(blogData);
    await cache.flushPattern("mixhub:blogs");
    return blog;
  } catch (error) {
    console.warn("MongoDB write deferred, falling back to local runtime store:", error.message);
    const newDoc = {
      ...blogData,
      _id: blogData._id || `essay-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    inMemoryBlogs.unshift(newDoc);
    await cache.flushPattern("mixhub:blogs");
    return newDoc;
  }
};

// Get All Blogs (Cached for high throughput)
const getAllBlogs = async () => {
  const cacheKey = "mixhub:blogs:all";
  const cached = await cache.get(cacheKey);
  if (cached) return cached;

  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    if (blogs && blogs.length > 0) {
      await cache.set(cacheKey, blogs, 60); // 1 min TTL
      return blogs;
    }
  } catch (error) {
    console.warn("MongoDB find deferred, serving memory store:", error.message);
  }

  await cache.set(cacheKey, inMemoryBlogs, 60);
  return inMemoryBlogs;
};

// Get Single Blog
const getSingleBlog = async (id) => {
  const cacheKey = `mixhub:blog:${id}`;
  const cached = await cache.get(cacheKey);
  if (cached) return cached;

  let blog = null;
  try {
    blog = await Blog.findById(id);
    if (!blog) {
      blog = await Blog.findOne({ _id: id });
    }
  } catch {
    // If not in Mongo, check memory
  }

  if (!blog) {
    blog = inMemoryBlogs.find((b) => (b._id || b.id) === id);
  }

  if (blog) {
    await cache.set(cacheKey, blog, 120);
  }
  return blog;
};

// Update Blog
const updateBlog = async (id, updateData) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (updatedBlog) {
      await cache.flushPattern("mixhub:blogs");
      await cache.del(`mixhub:blog:${id}`);
      return updatedBlog;
    }
  } catch (error) {
    console.warn("MongoDB update deferred:", error.message);
  }

  const idx = inMemoryBlogs.findIndex((b) => (b._id || b.id) === id);
  if (idx !== -1) {
    inMemoryBlogs[idx] = { ...inMemoryBlogs[idx], ...updateData, updatedAt: new Date().toISOString() };
    await cache.flushPattern("mixhub:blogs");
    await cache.del(`mixhub:blog:${id}`);
    return inMemoryBlogs[idx];
  }
  return null;
};

// Delete Blog
const deleteBlog = async (id) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (deletedBlog) {
      await cache.flushPattern("mixhub:blogs");
      await cache.del(`mixhub:blog:${id}`);
      return deletedBlog;
    }
  } catch (error) {
    console.warn("MongoDB delete deferred:", error.message);
  }

  const idx = inMemoryBlogs.findIndex((b) => (b._id || b.id) === id);
  if (idx !== -1) {
    const removed = inMemoryBlogs.splice(idx, 1)[0];
    await cache.flushPattern("mixhub:blogs");
    await cache.del(`mixhub:blog:${id}`);
    return removed;
  }
  return null;
};

export const BlogServices = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
