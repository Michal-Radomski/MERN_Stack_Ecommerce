import {Request, Response, NextFunction} from "express";

const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Process stripe payments   =>   /api/v1/payment/process
exports.processPayment = catchAsyncErrors(async (req: Request, res: Response, _next: NextFunction) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",

    metadata: {integration_check: "accept_a_payment"},
  });

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
});

// Send Stripe API Key   =>   /api/v1/stripeapi
exports.sendStripApi = catchAsyncErrors(async (_req: Request, res: Response, _next: NextFunction) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});
