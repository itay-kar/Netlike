import express from "express";
import { getMovieDetails, getMoviesByCategory, getMovieTrailers, getRecommended, getSimiliarMovies, getTrendingMovie } from "../controllers/movie.controller.js";

const router = express.Router();


router.get("/trending", getTrendingMovie);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);
router.get("/:id/recommended/:page" , getRecommended);
router.get("/:id/similar" , getSimiliarMovies);
router.get("/:category", getMoviesByCategory);
export default router;