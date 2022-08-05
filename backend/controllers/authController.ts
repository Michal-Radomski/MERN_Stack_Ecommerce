export {};
import {Request, Response, NextFunction} from "express";

const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Register a User -> /api/v1/register
exports.registerUser = catchAsyncErrors(async (req: Request, res: Response, _next: NextFunction) => {
  const {name, email, password} = req.body;

  const user = await User.create({
    name: name,
    email: email,
    password: password,
    avatar: {
      public_id: "",
      url: "",
    },
  });

  const token = user.getJwtToken();

  res.status(201).json({
    success: true,
    // user: user,
    token: token,
  });
});
