const User = require("../models/users")

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")

const { HttpError } = require("../helpers");

const { ctrlWrapper } = require("../utils");

const {SECRET_KEY} = process.env;

const register = async(req, res) => {
    const {email, password}= req.body;
    const user = await User.findOne({email})
    if(user) {
        throw HttpError(409, "Email in use")
    }

    const hashPassword = await bcrypt.hash(password, 10)
    
    const newUser = await User.create({...req.body, password: hashPassword});
    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        }
    })
}

const login = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw HttpError(401, "Email or passwrod invalid")
    }

    const passwordCompare = await bcrypt.compare(password, user.password)
    if(!passwordCompare) {
        throw HttpError(401, "Email or passwrod invalid")
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"})
    await User.findByIdAndUpdate(user._id, {token})
    res.json({
        token,
    })
}

const current = async(req, res) => {
    const {email, subscription} = req.user;

    res.json({
        email,
        subscription,
    })
}

const logout = async(req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ''})

    res.status(204).json()
}

const  subscription = async(req, res) => {
    const {subscription} = req.body;
    const {_id, email} = req.user;
    await User.findByIdAndUpdate(_id, {subscription})
    
    res.json({
        email,
        subscription
    })
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    current: ctrlWrapper(current),
    logout: ctrlWrapper(logout),
    subscription: ctrlWrapper(subscription),
}