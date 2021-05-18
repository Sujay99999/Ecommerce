const express = require("express");

const productController = require("./../controllers/productControllers");

const router = express.Router();

router.get("/", productController.getProducts);
router.get("/category", productController.getAllCategoryNames);
router.get(
  "/category/:categoryName",
  productController.getProductsFromCategory,
  productController.getProducts
);
router.get(
  "/category/:categoryName/brands",
  productController.getProductsFromCategory,
  productController.getAllBrandNamesOfCategory
);
router.get("/:productId", productController.getSingleProduct);

module.exports = router;
