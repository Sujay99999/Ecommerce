const fs = require("fs");
const path = require("path");

const AppError = require("./../utils/AppError");
const Product = require("./../models/productModel");

exports.getAllCategoryNames = (req, res, next) => {
  // 1) Send back a arry of categories available
  const availableCategories = JSON.parse(
    fs.readFileSync(path.join(__dirname, "./../utils/availableCategories.json"))
  );
  console.log(availableCategories);

  // 2) Send back the response
  res.status(200).json({
    status: "success",
    count: availableCategories.length,
    data: {
      categories: availableCategories,
    },
  });
};

exports.getProductsFromCategory = (req, res, next) => {
  // 1) Set a searchobj as a part of req.body extracting it from the query params
  req.body.category = req.params.categoryName;
  // 2) Pass onto the next middleware
  next();
};

exports.getProducts = async (req, res, next) => {
  try {
    // 1) Get the search query from the req.body
    const searchObj = req.body;
    console.log(searchObj);

    // 2) Get all the products with the searchObj
    const allProducts = await Product
      // .find(searchObj)
      .aggregate([
        {
          $match: { category: searchObj.category },
        },
        {
          $sort: { technicalDetails: -1 },
        },
      ]);

    // 3) Send back a response with the array of products
    res.status(200).json({
      status: "success",
      count: allProducts.length,
      data: {
        products: allProducts,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getSingleProduct = async (req, res, next) => {
  // 1) Get the product based on the id in the params
  const product = await Product.findById(req.params.productId);
  if (!product) {
    return next(new AppError(404, "Product not found"));
  }

  // 2) Send back the response
  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
};
