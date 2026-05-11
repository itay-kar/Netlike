import express from "express";
import {
  deleteSearchHistory,
  getSearchHistory,
  searchMovie,
  searchPerson,
  searchTV,
  clearSearchHistory,
} from "../controllers/search.controller.js";

const router = express.Router();

router.get("/person/:query", searchPerson);
router.get("/movie/:query", searchMovie);
router.get("/tv/:query", searchTV);

router.get("/history", getSearchHistory);
router.delete("/history/:id", deleteSearchHistory);
router.delete("/history", clearSearchHistory);

export default router;
