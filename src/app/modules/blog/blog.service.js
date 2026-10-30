import mongoose from "mongoose";
import Blog from "./blog.model.js";
import { cache } from "../../utils/cache.js";
import { SEED_ESSAYS } from "./blog.constants.js";

// In-memory runtime store fallback with claps & comments
let inMemoryBlogs = SEED_ESSAYS.map((b) => ({
  ...b,
  claps: b.claps || 54,
  comments: b.comments || [
    {
      _id: "c-init-1",
      author: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      text: "This resonated so deeply with our team's recent transition back to deterministic monoliths. Beautifully written.",
      date: "2 days ago",
    },
  ],
}));

// Create Blog & Invalidate Cache
const createBlog = async (blogData) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const blog = await Blog.create(blogData);
      await cache.flushPattern("mixhub:blogs");
      return blog;
    } catch (error) {
      console.warn("MongoDB write deferred:", error.message);
    }
  }

  const newDoc = {
    ...blogData,
    _id: blogData._id || `essay-${Date.now()}`,
    claps: 0,
    comments: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  inMemoryBlogs.unshift(newDoc);
  await cache.flushPattern("mixhub:blogs");
  return newDoc;
};

// Get All Blogs (Cached for high throughput, supports instant query search)
const getAllBlogs = async (searchTerm) => {
  let blogs = [];

  if (mongoose.connection.readyState === 1) {
    try {
      blogs = await Blog.find().sort({ createdAt: -1 });
    } catch (error) {
      console.warn("MongoDB find deferred:", error.message);
    }
  }

  if (!blogs || blogs.length === 0) {
    blogs = inMemoryBlogs;
  }

  if (searchTerm && searchTerm.trim()) {
    const q = searchTerm.toLowerCase().trim();
    return blogs.filter((b) => {
      const t = typeof b.title === "object" ? `${b.title.en} ${b.title.bn}` : b.title || "";
      const s = typeof b.sdesc === "object" ? `${b.sdesc.en} ${b.sdesc.bn}` : b.sdesc || "";
      const c = typeof b.category === "object" ? `${b.category.en} ${b.category.bn}` : b.category || "";
      return t.toLowerCase().includes(q) || s.toLowerCase().includes(q) || c.toLowerCase().includes(q);
    });
  }

  return blogs;
};

// Get Single Blog
const getSingleBlog = async (id) => {
  const cacheKey = `mixhub:blog:${id}`;
  const cached = await cache.get(cacheKey);
  if (cached) return cached;

  let blog = null;
  if (mongoose.connection.readyState === 1) {
    try {
      blog = await Blog.findById(id);
      if (!blog) {
        blog = await Blog.findOne({ _id: id });
      }
    } catch {
      // Ignored
    }
  }

  if (!blog) {
    blog = inMemoryBlogs.find((b) => (b._id || b.id) === id);
  }

  if (blog) {
    await cache.set(cacheKey, blog, 60);
  }
  return blog;
};

// Clap / Like Blog dynamically
const clapBlog = async (id) => {
  let clapsCount = 0;
  if (mongoose.connection.readyState === 1) {
    try {
      const doc = await Blog.findByIdAndUpdate(id, { $inc: { claps: 1 } }, { new: true });
      if (doc) {
        await cache.del(`mixhub:blog:${id}`);
        return { claps: doc.claps };
      }
    } catch {
      // Memory fallback
    }
  }

  const blog = inMemoryBlogs.find((b) => (b._id || b.id) === id);
  if (blog) {
    blog.claps = (blog.claps || 0) + 1;
    clapsCount = blog.claps;
  } else {
    clapsCount = 1;
  }
  await cache.del(`mixhub:blog:${id}`);
  return { claps: clapsCount };
};

// Add Comment dynamically
const addComment = async (id, commentData) => {
  const comment = {
    _id: `c-${Date.now()}`,
    author: commentData.author || "Reader",
    avatar: commentData.avatar || "",
    text: commentData.text,
    date: new Date().toISOString(),
  };

  if (mongoose.connection.readyState === 1) {
    try {
      const doc = await Blog.findByIdAndUpdate(
        id,
        { $push: { comments: comment } },
        { new: true }
      );
      if (doc) {
        await cache.del(`mixhub:blog:${id}`);
        return doc.comments;
      }
    } catch {
      // Memory fallback
    }
  }

  const blog = inMemoryBlogs.find((b) => (b._id || b.id) === id);
  if (blog) {
    if (!blog.comments) blog.comments = [];
    blog.comments.unshift(comment);
    await cache.del(`mixhub:blog:${id}`);
    return blog.comments;
  }

  return [comment];
};

// Update Blog
const updateBlog = async (id, updateData) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, { new: true });
      if (updatedBlog) {
        await cache.flushPattern("mixhub:blogs");
        await cache.del(`mixhub:blog:${id}`);
        return updatedBlog;
      }
    } catch (error) {
      console.warn("MongoDB update deferred:", error.message);
    }
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
  if (mongoose.connection.readyState === 1) {
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
  clapBlog,
  addComment,
  updateBlog,
  deleteBlog,
};
