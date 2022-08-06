import {Response} from "express";

import {User} from "../interfaces";

// Create and send token and save in the cookie.
const sendToken = (user: User, statusCode: number, res: Response) => {
  // Create JWT Token
  const token = user.getJwtToken();
  // console.log({token});
  // console.log({user});
  // console.log("Number(process.env.COOKIE_EXPIRES_TIME):", Number(process.env.COOKIE_EXPIRES_TIME));

  // Options for cookie
  const options = {
    expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRES_TIME) * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token: token,
    user: user,
  });
};

module.exports = sendToken;
