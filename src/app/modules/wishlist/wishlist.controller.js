import { WishlistServices } from "./wishlist.service";


const createWishlistItem = async (req, res) => {
  try {
    const wishlistData = req.body;
    const result = await WishlistServices.createWishlistItem(wishlistData);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ error: "Failed to create wishlist item" });
  }
};

const getAllWishlistItems = async (req, res) => {
  try {
    const result = await WishlistServices.getAllWishlistItems();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: "Failed to get wishlist items" });
  }
};

const getWishlistItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await WishlistServices.getWishlistItemById(id);
    if (!result) {
      return res.status(404).send({ error: "Wishlist item not found" });
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: "Failed to get wishlist item" });
  }
};

const deleteWishlistItem = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await WishlistServices.deleteWishlistItem(id);
    if (!result) {
      return res.status(404).send({ error: "Wishlist item not found" });
    }
    res.status(200).send({ message: "Wishlist item deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: "Failed to delete wishlist item" });
  }
};

export const WishlistController = {
  createWishlistItem,
  getAllWishlistItems,
  getWishlistItemById,
  deleteWishlistItem,
};
