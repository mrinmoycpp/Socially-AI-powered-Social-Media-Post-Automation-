//Register User 

import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";


const generateToken = (userId: any): string => {
  const jwt = require("jsonwebtoken");
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET || "default_secret", {
    expiresIn: "1d",
  });
  return token;
};

//POST/api/auth/register
export const registerUser = async (req: Request, res:
  Response): Promise<void> => {
    try {
      const { email, password, name} = req.body;
      const userExists = await User.findOne({email});
      if(userExists) {
        res.status(400).json({message: "User already exists"});
        return;
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name, email, password: hashedPassword
      })
      if(user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        }) 
      } else {
          res.status(400).json({message: "Invalid user data"});
          return;
        } 
      }
     catch (error) {
      res.status(500).json({message: "Error registering user"})
    }
    
  }


  //POST/api/auth/login
  export const LoginUser = async (req: Request, res:
    Response, next: NextFunction): Promise<void> => {
      try {
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if(user && (await bcrypt.compare(password, user.password))) {
          res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
          })
        } else {
          res.status(401).json({message: "Invalid email or password"})
        }
      } catch (error) {
        res.status(500).json({message: "Error logging in"})
      }
    }
