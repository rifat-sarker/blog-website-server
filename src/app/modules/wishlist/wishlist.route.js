import express from "express";
import { WishlistController } from "./wishlist.controller.js";

const router = express.Router();

router.post("/", WishlistController.createWishlistItem);
router.get("/", WishlistController.getAllWishlistItems);
router.get("/:id", WishlistController.getWishlistItemById);
router.delete("/:id", WishlistController.deleteWishlistItem);

export const WishlistRoutes = router;
