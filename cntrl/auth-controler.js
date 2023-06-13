const User = require('../models/user-schema.js')

const { HttpError } = require('../helpers/index.js');

const { cntrlWrapper } = require('../decorators/index.js')

const Joi = require('joi');

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const {SECRET_KEY} = require('../config.js')

const userRegisterSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().pattern(/^([a-zA-Z0-9_\-]+)@([a-zA-Z0-9_\-]+)\.[a-zA-Z]{2,5}$/, 'this is not email').required(),
    subscription: Joi.string(),
})

const userLoginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().pattern(/^([a-zA-Z0-9_\-]+)@([a-zA-Z0-9_\-]+)\.[a-zA-Z]{2,5}$/, 'this is not email').required(),
})

const signUp = async(req, res) => {
    const { error } = userRegisterSchema.validate(req.body)
    if (error) {
        throw HttpError(400, `missing required field`)
    }

    const {email, password} = req.body
    const user = await User.findOne({email})

    if (user) {
        throw HttpError(409, `Email in use`)
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({...req.body, password: hashPassword})
    res.status(201).json({
        "user": {
            "email": newUser.email,
            "subscription": newUser.subscription
          }
    })
}

const login = async(req, res) => {
    const { error } = userLoginSchema.validate(req.body)
    if (error) {
        throw HttpError(400, `missing required field`)
    }

    const { email, password } = req.body
    const user = await User.findOne({email})
    if (!user) {
        throw HttpError(401, `Email or password is wrong`)
    }

    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
        throw HttpError(401, `Email or password is wrong`)
    }

    const { _id: id } = user;

    const payload = {
        id,
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "24h"});
    await User.findByIdAndUpdate(id, {token})

    res.json({
        "token": token,
        "user": {
            "email": user.email,
            "subscription": user.subscription
        }
    })
}

const getCurrent = async(req, res) => {
    const { subscription, email } = req.user

    res.json({
        email,
        subscription,
    })
}

const logout = async(req, res) => {
    const {_id} = req.user
    await User.findByIdAndUpdate(_id, {token: ""})

    res.status(204).json({"message": "You logout"})
}

module.exports = {
    signup: cntrlWrapper(signUp),
    login: cntrlWrapper(login),
    getCurrent: cntrlWrapper(getCurrent),
    logout: cntrlWrapper(logout)
}