import {Request, Response, NextFunction} from "express";

exports.getProducts = (req: Request, res: Response, _next: NextFunction) => {
  const {ip} = req;
  console.log({ip});
  res.status(200).json({
    success: true,
    message: "This route will show all products in database",
  });
};
