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

// Login User  =>  /api/v1/login
exports.loginUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const {email, password} = req.body;

  // Checks if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }

  // Finding user in database
  const user = await User.findOne({email: email}).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  // Checks if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  const token = user.getJwtToken();

  res.status(200).json({
    success: true,
    token: token,
  });
});
