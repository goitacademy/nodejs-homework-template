import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'
import { HttpError } from "../helpers/index.js";

const {JWT_SECRET} = process.env
export const signup = async (req, res, next) => {
    try {   
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, "Such email is exist");
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });

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
        const passwordCompare = bcryptjs.compare(password, user.password)
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

export const getCurrent = async (req, res, next) => {
  try {
      const { email, subscription } = req.user;

    res.json({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};
export const signout = async (req,res,next) => {
    try {
      
        const { _id } = req.user
        await User.findByIdAndUpdate(_id, { token: "" })
            res.status(204).json()
    }
    catch (error) {
        next(error)
    }
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
}
