export {};
import {Request, Response, NextFunction} from "express";

const Order = require("../models/order");
const Product = require("../models/product");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
import {User} from "../interfaces";

interface CustomRequest extends Request {
  user: User;
}
// Create a new order   =>  /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req: CustomRequest, res: Response) => {
  const {orderItems, shippingInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, paymentInfo} = req.body;
  // console.log("req.body:", req.body);

  const order = await Order.create({
    orderItems: orderItems,
    shippingInfo: shippingInfo,
    itemsPrice: itemsPrice,
    taxPrice: taxPrice,
    shippingPrice: shippingPrice,
    totalPrice: totalPrice,
    paymentInfo: paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });
  // console.log({order});

  res.status(200).json({
    success: true,
    order: order,
  });
});

// Get single order   =>   /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");
  // console.log({order});

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    order: order,
  });
});

// Get logged in user orders   =>   /api/v1/orders/me
exports.myOrders = catchAsyncErrors(async (req: CustomRequest, res: Response) => {
  const orders = await Order.find({user: req.user.id});
  // console.log({orders});

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get all orders - Admin  =>   /api/v1/admin/orders/
exports.allOrders = catchAsyncErrors(async (_req: Request, res: Response) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order: {totalPrice: number}) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// Update / Process order - Admin  =>   /api/v1/admin/order/:id
exports.updateOrder = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  order.orderItems.forEach(async (item: {product: string; quantity: number}) => {
    await updateStock(item.product, item.quantity);
  });

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id: string, quantity: number) {
  const product = await Product.findById(id);

  product.stock = product.stock - quantity;

  await product.save({validateBeforeSave: false});
}

// Delete order   =>   /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});
