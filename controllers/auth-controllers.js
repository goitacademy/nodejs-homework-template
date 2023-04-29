const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const { ctrlWrapper } = require("../utils");

const {User} = require("../models/contacts/users");

// const { HttpError } = require("../helpers");

const {SECRET_KEY} = process.env;

async function register (req, res, next) {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(user) {
            return res.status(409).json({
                message: "Email in use"
            })
        }
    
        const hashPassword = await bcrypt.hash(password, 10);
        
        const result = await User.create({...req.body, password: hashPassword});
    
        res.status(201).json({
            email: result.email,
            subscription: result.subscription,
        })
    }
    catch(error) {
        next(error);
    }
}

async function login (req, res, next) {
    try {
        const {email, password} = req.body;
        // const {subscription} = req.user;
        const user = await User.findOne({email});
        if(!user) {
            return res.status(401).json({
                message: "Email or password is wrong"
        })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare) {
            return res.status(401).json({
            message: "Email or password is wrong"
        })
        }

        const payload = {
            id: user._id,
        }

        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
        await User.findByIdAndUpdate(user._id, {token});

        res.status(201).json({
            token,
            email,
            // subscription,

        })
    }
    catch(error) {
        next(error);
    }
}

async function getCurrent (req, res, next) {
    try {
        const { _id } = req.user;
        // const {email, subscription} = req.user;
        const{ email, subscription } = await User.findById(_id);
        
        res.status(200).json({
            email,
            subscription,
        })
    }
    catch(error) {
        next(error);
    }
}

async function logout (req, res, next) {
    try {
        const {_id} = req.user;

        // const user = await User.findOne({_id});
        // if(!user) {
        //     return res.status(401).json({
        //     message: "Not authorized"
        // })
        // }

        await User.findByIdAndUpdate(_id, {token: ""});

        res.status(204).json({
            message: "Logout success"
        })
    }
    catch(error) {
        next(error);
    }
}

module.exports = {
    register,
    login,
    getCurrent,
    logout,
}