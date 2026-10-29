import { WishlistServices } from "./wishlist.service.js";

const createWishlistItem = async (req, res) => {
  try {
    const wishlistData = req.body;
    const result = await WishlistServices.createWishlistItem(wishlistData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create wishlist item", message: error.message });
  }
};

const getAllWishlistItems = async (req, res) => {
  try {
    const { email } = req.query;
    const result = await WishlistServices.getAllWishlistItems(email);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to get wishlist items", message: error.message });
  }
};

const getWishlistItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await WishlistServices.getWishlistItemById(id);
    if (!result) {
      return res.status(404).json({ error: "Wishlist item not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to get wishlist item", message: error.message });
  }
};

const deleteWishlistItem = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await WishlistServices.deleteWishlistItem(id);
    if (!result) {
      return res.status(404).json({ error: "Wishlist item not found" });
    }
    res.status(200).json({ message: "Wishlist item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete wishlist item", message: error.message });
  }
};

export const WishlistController = {
  createWishlistItem,
  getAllWishlistItems,
  getWishlistItemById,
  deleteWishlistItem,
};
