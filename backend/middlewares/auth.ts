export {};
const jwt = require("jsonwebtoken");
import {Request, Response, NextFunction} from "express";

const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
import {User as UserInterface} from "../interfaces";

// console.log({User});

interface CustomRequest extends Request {
  user: UserInterface;
}

// Checks if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req: CustomRequest, _res: Response, next: NextFunction) => {
  // const {cookies} = req;
  // console.log({cookies});

  const {token} = req.cookies;
  // console.log({token});

  if (!token) {
    return next(new ErrorHandler("Login first to access this resource.", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);

  next();
});

// Handling users roles
exports.authorizeRoles = (...roles: ((role: string) => string)[]) => {
  return (req: CustomRequest, _res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`, 403));
    }
    next();
  };
};
