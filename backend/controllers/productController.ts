import {Request, Response, NextFunction} from "express";

const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
import {User} from "../interfaces";

interface CustomRequest extends Request {
  user: User;
}

// Create a New Product => /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async (req: CustomRequest, res: Response) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product: product,
  });
});

// Get All Products => /api/v1/products?keyword=apple
exports.getProducts = catchAsyncErrors(async (req: Request, res: Response) => {
  // const {ip} = req;
  // console.log({ip});

  const resPerPage = 4;
  const productsCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter();
  let products = await apiFeatures.query;
  let filteredProductsCount = products.length;

  apiFeatures.pagination(resPerPage);
  products = await apiFeatures.query.clone();

  setTimeout(() => {
    res.status(200).json({
      success: true,
      // message: "This route will show all products in database",
      // count: products.length,
      productsCount: productsCount,
      products: products,
      resPerPage: resPerPage,
      filteredProductsCount: filteredProductsCount,
    });
  }, 500);
});

// Get Single Product Details   =>   /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const product = await Product.findById(req.params.id);
  // console.log({product});
  if (!product) {
    // return res.status(404).json({
    //   success: false,
    //   message: "Product Not Found",
    // });
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    product: product,
  });
});

// Update Product => /api/admin/v1/product/:id
exports.updateProduct = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    // return res.status(404).json({
    //   success: false,
    //   message: "Product Not Found",
    // });
    return next(new ErrorHandler("Product Not Found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    product: product,
  });
});

// Delete Product => /api/v1/product
exports.deleteProduct = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    // return res.status(404).json({
    //   success: false,
    //   message: "Product Not Found",
    // });
    return next(new ErrorHandler("Product Not Found", 404));
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product is deleted.",
  });
});

// Create new review   =>   /api/v1/review
exports.createProductReview = catchAsyncErrors(async (req: CustomRequest, res: Response) => {
  const {rating, comment, productId} = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment: comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (r: {user: {toString: () => string}}) => r.user.toString() === req?.user?._id?.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review: {user: {toString: () => string}; comment: string; rating: number}) => {
      if (review.user.toString() === req?.user?._id?.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc: number, item: {rating: number}) => item.rating + acc, 0) / product.reviews.length;

  await product.save({validateBeforeSave: false});

  res.status(200).json({
    success: true,
  });
});

// Get Product Reviews   =>   /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async (req: Request, res: Response) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Product Review   =>   /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req: Request, res: Response) => {
  const product = await Product.findById(req.query.productId);
  // console.log({product});

  const reviews = product.reviews.filter((review: {_id: string}) => review._id.toString() !== req?.query?.id?.toString());
  const numOfReviews = reviews.length;
  const ratings = product.reviews.reduce((acc: number, item: {rating: number}) => item.rating + acc, 0) / reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews: reviews,
      ratings: ratings,
      numOfReviews: numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
