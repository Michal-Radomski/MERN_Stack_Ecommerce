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

exports.getProducts = (req: Request, res: Response, _next: NextFunction) => {
  const {ip} = req;
  console.log({ip});
  res.status(200).json({
    success: true,
    message: "This route will show all products in database",
  });
};
