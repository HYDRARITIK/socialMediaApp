// const User = require("../models/userModel");

import asyncHandler from "../middlewares/async";
import { Schema, model, Document } from "mongoose";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";

import User from "../models/user";

//@desc     Register user
//@route    POST /api/v1/auth/register
//@access   Public

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {name, email, password } = req.body;
    console.log(req.body);

    // Check if user already exists
    const existingUser = await User.findOne({name });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    // const salt = await bcrypt.genSalt(10);
    const hashedPassword = password;

    // Create a new user
    const newUser = new User({name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//@desc     Login user
//@route    POST /api/v1/auth/login
//@access   Public

const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, password } = req.body;
    const UserIndb = await User.find({ name:name });

    if (UserIndb.length === 0) {
      return res.status(400).json({ success: false, msg: "User not found" });
    }

    //match password

    const isMatch = UserIndb[0].password === password;
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, msg: "Incorrect credentials" });
    }

    //now we have to send the token to the user inside a cookie
    sendTokenResponse(UserIndb[0], 200, res);
  }
);

//@desc     Logout user
//@route    Get /api/v1/auth/logout
//@access   Private

const logout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // res.cookie("Token", "none", {
    //   expires: new Date(Date.now() + 10 * 1000), //10 seconds
    //   httpOnly: true,
    // });

    res.clearCookie("Token");

    res.status(200).json({ success: true, msg: "User logged out" });
  }
);

//function to send token inside cookie

const sendTokenResponse = (
  user: Document,
  statusCode: number,
  res: Response
) => {
  const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  //now we have to send the token to the user inside a cookie

  const options = {
    expires: new Date(
      Date.now() + 24 * 60 * 60 * 1000 //1 day
    ),
    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookie("Token", jwt, options)
    .json({ success: true, msg: jwtToken ,user});
};

export { register, login, logout };
