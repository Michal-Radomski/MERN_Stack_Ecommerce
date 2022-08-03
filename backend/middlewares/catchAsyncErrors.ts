import {Request, Response, NextFunction} from "express";

module.exports = (func: any) => (req: Request, res: Response, next: NextFunction) => {
  // console.log({func});
  Promise.resolve(func(req, res, next)).catch(next);
};
