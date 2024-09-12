
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { HttpError } = require("../helpers");
const ctrlWrapper = require("../decorators/ctrlWrapper");
const { User }= require("../models/users");

const { SECRET_KEY } = process.env;

const register = ctrlWrapper(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw new HttpError(409, "Email already exist");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const result = await User.create({...req.body, password: hashPassword});

    res.status(201).json({
        user:{
            email: result.email,
            subscription: "starter"
        }
    })
})

const login = ctrlWrapper( async(req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) {
        throw new  HttpError(401, "Email or password is wrong");
    }

    const isPasswordCompare = await bcrypt.compare(password, user.password);

    if(!isPasswordCompare){
        throw new HttpError(401, "Email or password is wrong");
    }

    const {_id: id} = user;

    const payload = {
        id,
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
    await User.findByIdAndUpdate(id, {token});

    res.json({
        token,
        user:{
            email: user.email,
            subscription: user.subscription
        }
    })
})

const getCurrent = ctrlWrapper( async(req, res) => {
    const {email, subscription} = req.user;

    res.json({
        email,
        subscription,
    })
})

const logout = ctrlWrapper( async (req, res) => {
    const {_id} = req.user;

    await User.findByIdAndUpdate(_id, {token: null});

    res.status(204).json({
        message: "Logout success"
    })
})

module.exports = {
    register,
    login,
    getCurrent, 
    logout,
}