import Product from "../models/productModels.js";
import asyncHandler from "express-async-handler";

const getProducts = asyncHandler(async (req, res) => {
  const pageSize =10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const Count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(Count / pageSize) });
});

const getProductsById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    throw new Error("Product Not Found");
  }
});
const deleteproduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product deleted" });
  } else {
    throw new Error("Product Not Found");
  }
});
const createproduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: "0",
    user: req.user._id,
    image: "/images/sample.jpg",

    Category: "Sample Category",
    countInStock: 0,
    Quality: "Sample",
    numReviews: 0,
    Description: "Sample Description",
  });
  const createdproduct = await product.save();
  res.status(201).json(createdproduct);
});
const Updateproduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,

    Category,
    countInStock,
    numReviews,
    Description,
    Quality,
  } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.Description = Description;
    product.image = image;

    product.Category = Category;
    product.countInStock = countInStock;
    product.numReviews = numReviews;
    product.Quality = Quality;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
const Createproductreview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyreviewed = product.review.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyreviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.review.push(review);
    product.numReviews = product.review.length;
    product.rating = product.review.reduce((acc, item) => item.rating + acc, 0);
    product.review.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
export {
  getProducts,
  getProductsById,
  deleteproduct,
  createproduct,
  Updateproduct,
  Createproductreview,
};
