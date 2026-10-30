import mongoose from "mongoose";
import Wishlist from "./wishlist.model.js";

let inMemoryWishlist = [];

const createWishlistItem = async (wishlistData) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const item = await Wishlist.create(wishlistData);
      return item;
    } catch (error) {
      console.warn("MongoDB wishlist save deferred:", error.message);
    }
  }

  const newDoc = {
    ...wishlistData,
    _id: wishlistData._id || `wish-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  inMemoryWishlist.unshift(newDoc);
  return newDoc;
};

const getAllWishlistItems = async (email) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const query = email ? { email } : {};
      const items = await Wishlist.find(query).sort({ createdAt: -1 });
      if (items && items.length > 0) return items;
    } catch (error) {
      console.warn("MongoDB wishlist find deferred:", error.message);
    }
  }

  if (email) {
    return inMemoryWishlist.filter((w) => w.email === email);
  }
  return inMemoryWishlist;
};

const getWishlistItemById = async (id) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const item = await Wishlist.findById(id);
      if (item) return item;
    } catch {
      // Check in-memory
    }
  }
  return inMemoryWishlist.find((w) => (w._id || w.id) === id) || null;
};

const deleteWishlistItem = async (id) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const result = await Wishlist.findByIdAndDelete(id);
      if (result) return result;
    } catch {
      // Check in-memory
    }
  }
  const idx = inMemoryWishlist.findIndex((w) => (w._id || w.id) === id);
  if (idx !== -1) {
    return inMemoryWishlist.splice(idx, 1)[0];
  }
  return null;
};

export const WishlistServices = {
  createWishlistItem,
  getAllWishlistItems,
  getWishlistItemById,
  deleteWishlistItem,
};
