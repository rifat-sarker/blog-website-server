import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    blogId: { type: String },
    title: { type: mongoose.Schema.Types.Mixed, required: true },
    imageURL: { type: String },
    image: { type: String },
    sdesc: { type: mongoose.Schema.Types.Mixed },
    ldesc: { type: mongoose.Schema.Types.Mixed },
    category: { type: mongoose.Schema.Types.Mixed },
    email: { type: String, default: "reader@mixhub.press" },
    author: { type: mongoose.Schema.Types.Mixed },
    readTime: { type: mongoose.Schema.Types.Mixed },
    words: { type: Number },
    edition: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

export default Wishlist;
