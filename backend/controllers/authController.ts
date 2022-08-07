export {};
import {Request, Response, NextFunction} from "express";
const crypto = require("crypto");

const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
import {User} from "../interfaces";

interface CustomRequest extends Request {
  user: User;
}

// Register a User -> /api/v1/register
exports.registerUser = catchAsyncErrors(async (req: Request, res: Response, _next: NextFunction) => {
  const {name, email, password} = req.body;

  const user = await User.create({
    name: name,
    email: email,
    password: password,
    avatar: {
      public_id: "michal123",
      url: "https://www.test.com.pl/test1.png",
    },
  });

  // const token = user.getJwtToken();

  // res.status(201).json({
  //   success: true,
  //   // user: user,
  //   token: token,
  // });
  sendToken(user, 200, res);
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

  // const token = user.getJwtToken();

  // res.status(200).json({
  //   success: true,
  //   token: token,
  // });
  sendToken(user, 200, res);
});

// Forgot Password   =>  /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findOne({email: req.body.email});

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();
  console.log({resetToken});

  await user.save({validateBeforeSave: false});

  // Create reset password url
  const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "ShopIT Password Recovery",
      message: message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    console.log({error});
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({validateBeforeSave: false});

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password   =>  /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  // Hash URL token
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
  // console.log({resetPasswordToken});

  const user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: {$gt: Date.now()}, // gt => greater than
  });
  // console.log({user});

  if (!user) {
    return next(new ErrorHandler("Password reset token is invalid or has been expired", 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  // Setup new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Logout user   =>   /api/v1/logout
exports.logoutUser = catchAsyncErrors(async (_req: Request, res: Response) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

// Get currently logged in user details   =>   /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req: CustomRequest, res: Response) => {
  const user = await User.findById(req.user.id);
  // console.log({user});

  res.status(200).json({
    success: true,
    user: user,
  });
});

// Update / Change password   =>  /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req: CustomRequest, res: Response, next: NextFunction) => {
  const user = await User.findById(req.user.id).select("+password");
  // console.log({user});

  // Check previous user password
  const isMatched = await user.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  user.password = req.body.password;
  await user.save();

  sendToken(user, 200, res);
});

// Update user profile   =>   /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req: CustomRequest, res: Response) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  // console.log({newUserData});

  //TODO: Update avatar
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  // console.log({user});

  res.status(200).json({
    success: true,
  });
});

//- Admin Routes
// Get all users   =>   /api/v1/admin/users
exports.allUsers = catchAsyncErrors(async (_req: Request, res: Response) => {
  const users = await User.find();
  // console.log({users});

  res.status(200).json({
    success: true,
    users: users,
  });
});

// Get user details   =>   /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById(req.params.id);
  // console.log({user});

  if (!user) {
    return next(new ErrorHandler(`User does not found with id: ${req.params.id}`));
  }

  res.status(200).json({
    success: true,
    user: user,
  });
});
