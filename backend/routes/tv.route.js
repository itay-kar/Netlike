import express from "express";
import {
  getShowsDetails,
  getShowsByCategory,
  getShowsTrailers,
  getRecommended,
  getSimilarShows,
  getTrendingShows,
} from "../controllers/tv.controller.js";

const router = express.Router();

router.get("/trending", getTrendingShows);
router.get("/:id/trailers", getShowsTrailers);
router.get("/:id/details", getShowsDetails);
router.get("/:id/recommended/:page", getRecommended);
router.get("/:id/similar", getSimilarShows);
router.get("/:category", getShowsByCategory);

export default router;
