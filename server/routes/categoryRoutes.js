const {
  createCategoryController,
  updateCategoryController,
  getCategoriesController,
  singleCategoryController,
  deleteCategoryController,
} = require("../controllers/createCategoryController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

const express = require("express");

const router = express.Router();

//create category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//Get all categories
router.get("/categories", getCategoriesController);

//Single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

module.exports = router;
