import express from "express";
import { NewsController } from "./news.controller.js";

const router = express.Router();

router.get("/live", NewsController.getLiveDispatches);
router.get("/stream", NewsController.streamDispatches);
router.post("/dispatch", NewsController.createDispatch);

export const NewsRoutes = router;

