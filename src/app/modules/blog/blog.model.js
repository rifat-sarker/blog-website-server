import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    sdesc: { type: String, required: true },
    ldesc: { type: String, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
