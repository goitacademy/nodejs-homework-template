import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'
import { HttpError } from "../helpers/index.js";
import jsonwebtoken from 'jsonwebtoken'
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import gravatar from 'gravatar'
import path from "path";
import fs from "fs/promises";
import "dotenv/config";
import jimp from "jimp";

const avatarsPath = path.resolve("public", "avatars");
const {JWT_SECRET} = process.env
export const signup = async (req, res, next) => {
    try {   
   const { email, password } = req.body;
   const user = await User.findOne({ email });
   const avatarURL = gravatar.url(email);
   if (user) {
     throw HttpError(409, "Such email is exist");
   }
   const hashPassword = await bcryptоы.hash(password, 10);
   const newUser = await User.create({
     ...req.body,
     password: hashPassword,
     avatarURL,
   });
   res.status(201).json({
     user: {
       email: newUser.email,
       subscription: newUser.subscription,
     },
   });
    }
    catch (error) {
        next(error)
    }
} 

export const signin = async (req, res, next) => {
    
    try {   
      const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            throw HttpError(401, "Email or password invalid")  
        }
        const passwordCompare =  await bcryptjs.compare(password, user.password)
         if (!passwordCompare) {
            throw HttpError(401, "Email or password invalid");
        }
        const payload = {
            id:user._id
        }
        
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" })
        await User.findByIdAndUpdate(user._id,{token})
       res.status(200).json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });    
    }
    catch (error) { 
        next(error)
    }
}

export const signout = async (req,res,next) => {
  
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: " " });
  res.status(204).json({
    message: "No content",
  });
}

export const updateSubscription = async (req, res, next) => {
  const { subscription } = req.body;
  const { token } = req.user;
  
  const { id } = jsonwebtoken.verify(token, JWT_SECRET);
  
  const updateUser = await User.findByIdAndUpdate(
    id,
    { subscription },
    { new: true, runValidators: true }
    );
    if (!updateUser) {
      throw HttpError(404, "User not found");
    }
    
    res.status(200).json(updateUser);
  }
  
  
export const updateAvatar = async (req, res, next) => {
  try {
      
  
      const { _id } = req.user;
      const { path: oldPath, filename } = req.file;

      const newPath = path.join(avatarsPath, filename);

      (await jimp.read(oldPath)).resize(250, 250).write(oldPath);

      await fs.rename(oldPath, newPath);

      const avatarURL = path.join("avatars", filename);

      await User.findByIdAndUpdate(_id, { avatarURL });

      res.status(200).json({ avatarURL });
  }
  catch (error) {
    
  }
    }
    export const getCurrent = async (req, res, next) => {
      
          const { email, subscription } = req.user;
    
        res.json({
          email,
          subscription,
        });
     
    };
    export default ctrlWrapper(signout);