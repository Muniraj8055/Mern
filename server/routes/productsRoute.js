const express = require("express");
const router = express.Router();
const { isAdmin, requireSignIn } = require("../middlewares/authMiddleware");
const {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  updateProductController,
  deleteProductController,
  productFiltersController,
  realtedProductController,
  productCategoryController,
} = require("../controllers/productController");

const formidable = require("express-formidable");

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//updfate product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//delete product
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

module.exports = router;
