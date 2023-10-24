import HttpError from '../helpers/index.js';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import ctrlWrapper from '../decorators/ctrlWrappers.js';
import  jwt  from 'jsonwebtoken';


// const  { JWT_SECRET} = process.env


const signUp = async (req, res) => {

    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (user){
        throw HttpError (409, `${email} already in use`);
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({...req.body, password: hashPassword});
    
    res.status(201).json({
        email: newUser.email,
        username: newUser.username

    })
};

const signIn = async(req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(!user){
        throw HttpError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if(!passwordCompare){
        throw HttpError(401, "Email or password is wrong");
    }


    const payload = {
        id: user._id,

    }

    
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "23h"});

    res.json({
        token,
    })
}


export default {
    signUp: ctrlWrapper(signUp),
    signIn: ctrlWrapper(signIn),
}