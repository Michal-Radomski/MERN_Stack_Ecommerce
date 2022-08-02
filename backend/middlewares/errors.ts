export {};
import {Request, Response, NextFunction} from "express";

const ErrorHandler = require("../utils/errorHandler");

module.exports = (
  err: {statusCode: number; message: string; stack: string},
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = {...err};
    err.message = error.message;
    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internal Sever Error",
    });
  }
};
