import {Request, Response, NextFunction} from "express";

const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Create a New Product => /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product: product,
  });
});

// Get All Products => /api/v1/products
exports.getProducts = catchAsyncErrors(async (req: Request, res: Response) => {
  const {ip} = req;
  console.log({ip});

  const products = await Product.find();

  res.status(200).json({
    success: true,
    // message: "This route will show all products in database",
    count: products.length,
    products: products,
  });
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
