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
  err.message = err.message || "Internal Sever Error";

  res.status(err.statusCode).json({
    success: false,
    error: err.stack,
  });
};
