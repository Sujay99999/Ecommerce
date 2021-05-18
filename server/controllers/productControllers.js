const fs = require("fs");
const path = require("path");

const AppError = require("./../utils/AppError");
const Product = require("./../models/productModel");
const APIFeatures = require("./../utils/APIFeatures");

exports.getAllCategoryNames = async (req, res, next) => {
  // 1) Send back a arry of categories available
  // const availableCategories = JSON.parse(
  //   fs.readFileSync(path.join(__dirname, "./../utils/availableCategories.json"))
  // );
  // console.log(availableCategories);
  const availableCategories = await Product.aggregate([
    {
      $group: {
        _id: "$category",
      },
    },
  ]);

  // 2) Send back the response
  res.status(200).json({
    status: "success",
    count: availableCategories.length,
    data: {
      categories: availableCategories,
    },
  });
};

exports.getAllBrandNamesOfCategory = async (req, res, next) => {
  // 1) Get the search query from the req.body
  const searchObj = req.body;

  // 2) Get all the products available in this category with the match filter
  const allProducts = await Product.find(searchObj).find({
    technicalDetails: { $exists: true, $ne: [] },
  });

  const brandMap = new Map();
  // console.log(allProducts.length);

  allProducts.forEach((product) => {
    const brandObj = product.technicalDetails.find((key) => {
      // console.log("the key is ", key);
      return key.detail === "Brand";
    });
    if (brandObj) {
      if (brandMap.has(brandObj.value)) {
        const prevValue = brandMap.get(brandObj.value);
        brandMap.set(brandObj.value, prevValue + 1);
      } else {
        brandMap.set(brandObj.value, 1);
      }
    }
  });
  console.log(brandMap.values());

  // 2) Send back the response
  res.status(200).json({
    status: "success",
    totalCount: brandMap.size,
    data: [...brandMap],
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
    console.log("searchObj is ", searchObj);

    // 2) Get all the products with the searchObj
    // here the productscount is the amouunt of products that passed the filter
    const allProducts = await new APIFeatures(
      Product.find(searchObj),
      req.query
    )
      .filter()
      .match()
      .filterSpecific()
      .sort()
      .select()
      .pagination().query;
    const productsCount = await new APIFeatures(
      Product.find(searchObj),
      req.query
    )
      .filter()
      .match()
      .query.countDocuments();

    // 3) Send back a response with the array of products
    res.status(200).json({
      status: "success",
      totalCount: productsCount,
      data: {
        count: allProducts.length,
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
