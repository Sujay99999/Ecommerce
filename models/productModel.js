const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    finalPrice: {
      type: Number,
      required: [true, "Every product must have a price"],
    },
    originalPrice: {
      type: Number,
    },
    savingPrice: {
      type: Number,
    },
    fullName: {
      type: String,
      required: [true, "Every product must have a name"],
      unique: [true, "Every product name must be unique"],
    },
    description: [
      {
        type: String,
      },
    ],
    technicalDetails: [
      {
        detail: {
          type: String,
        },
        value: {
          type: String,
        },
      },
    ],
    additionalDetails: [
      {
        detail: {
          type: String,
        },
        value: {
          type: String,
        },
      },
    ],
    averageRating: {
      type: Number,
      min: 1,
      max: 5,
      default: 4,
    },
    countRatings: {
      type: Number,
    },
    reviewArr: [
      {
        name: {
          type: String,
          required: [true, "Every review must contain a name"],
        },
        title: {
          type: String,
          required: [true, "Every review must contain a title"],
        },
        createdAt: {
          type: Date,
          required: [true, "Every review must contain the creation date"],
          default: Date.now(),
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
          default: 4,
        },
        description: {
          type: String,
        },
      },
    ],
    imageArr: [
      {
        type: String,
      },
    ],
    category: {
      type: String,
      enum: ["laptops", "cameras", "headphones", "speakers", "televisions"],
      required: [true, "Every product must belong to a category"],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

const Product = new mongoose.model("Product", productSchema);

module.exports = Product;
