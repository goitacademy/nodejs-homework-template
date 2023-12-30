import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

import User, { userSignupSchema, userSigninSchema } from "../models/User.js";

import { HttpError } from "../helpers/index.js";

const { JWT_SECRET } = process.env;

const signup = async (req, res, next) => {
    try {
        const { error } = userSignupSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            throw HttpError(409, "Email in use");
        }

        const hashPassword = await bcrypt.hash(password, 10)
        
        const newUser = await User.create({ ...req.body, password: hashPassword });
        res.json({
            user: ({
                email: newUser.email,
            subscription: newUser.subscription
            })
            
        })
    }
    catch (error) {
        next(error)
    }
};

const signin = async (req, res, next) => {
    try {
       const { error } = userSigninSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        } 

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw HttpError(401, "Email or password is wrong");
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
          throw HttpError(401, "Email or password is wrong");  
        }

        const {_id: contactId} = user;
    const payload = {
     contactId
        };

         const token =jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"});
        await User.findByIdAndUpdate(contactId, { token });
        
        res.json({
            token,
            user: ({
                email: user.email,
                subscription: user.subscription
            })
             
        })
     }
    catch (error) {
        next(error);
    }
}

const getCurrent = async (req, res)=>{
    
        const { email, subscription } = req.user;
    
    res.json({
        email,
        subscription
    });
    
}

const signout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.json({
        email,
        subscription
    })
}
    


export default {
    signup,
    signin, 
    getCurrent,
    signout
}