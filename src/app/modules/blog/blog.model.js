import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    kicker: { type: mongoose.Schema.Types.Mixed, default: "" },
    title: { type: mongoose.Schema.Types.Mixed, required: true },
    sdesc: { type: mongoose.Schema.Types.Mixed, required: true },
    ldesc: { type: mongoose.Schema.Types.Mixed, required: true },
    date: { type: mongoose.Schema.Types.Mixed, default: () => new Date().toISOString() },
    category: { type: mongoose.Schema.Types.Mixed, required: true },
    edition: { type: mongoose.Schema.Types.Mixed, default: "Autumn 2026" },
    image: { type: String, default: "" },
    imageURL: { type: String, default: "" },
    author: {
      name: { type: mongoose.Schema.Types.Mixed, default: "Rifat Sarker" },
      location: { type: mongoose.Schema.Types.Mixed, default: "Dhaka Bureau" },
      role: { type: mongoose.Schema.Types.Mixed, default: "Contributing Editor" },
      avatar: { type: String, default: "" },
    },
    readTime: { type: mongoose.Schema.Types.Mixed, default: "6 min read" },
    words: { type: Number, default: 750 },
    claps: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
