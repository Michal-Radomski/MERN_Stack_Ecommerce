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
