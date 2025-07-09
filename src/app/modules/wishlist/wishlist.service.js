import Wishlist from "./wishlist.model.js";


const createWishlistItem = async (wishlistData) => {
  const item = await Wishlist.create(wishlistData);
  return item;
};

const getAllWishlistItems = async () => {
  const items = await Wishlist.find();
  return items;
};

const getWishlistItemById = async (id) => {
  const item = await Wishlist.findById(id);
  return item;
};

const deleteWishlistItem = async (id) => {
  const result = await Wishlist.findByIdAndDelete(id);
  return result;
};

export const WishlistServices = {
  createWishlistItem,
  getAllWishlistItems,
  getWishlistItemById,
  deleteWishlistItem,
};
