import {Request, Response, NextFunction} from "express";

const Product = require("../models/product");

// Create a New Product => /api/v1/admin/product/new
exports.newProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product: product,
  });
};

// Get All Products => /api/v1/products
exports.getProducts = async (req: Request, res: Response, _next: NextFunction) => {
  const {ip} = req;
  console.log({ip});

  const products = await Product.find();

  res.status(200).json({
    success: true,
    // message: "This route will show all products in database",
    count: products.length,
    products: products,
  });
};

// Get Single Product Details   =>   /api/v1/product/:id
exports.getSingleProduct = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product Not Found",
    });
  }

  res.status(200).json({
    success: true,
    product: product,
  });
};

// Update Product => /api/v1/product/:id
exports.updateProduct = async (req: Request, res: Response) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product Not Found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    product: product,
  });
};
