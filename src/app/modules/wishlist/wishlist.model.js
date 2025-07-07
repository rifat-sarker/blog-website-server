import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    imageURL: { type: String },
    sdesc: { type: String, required: true },
    ldesc: { type: String, required: true },
    category: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

export default Wishlist;
