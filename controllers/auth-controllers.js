const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { ctrlWrapper } = require("../utils");

const {User} = require("../models/user");

const { HttpError } = require("../helpers/HttpError");

const {SECRET_KEY} = process.env;

const register = async(req, res)=> {
    const {email, password, subscription} = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw HttpError(409, "Email already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    
    const result = await User.create({...req.body, password: hashPassword});

    res.status(201).json({
        name: result.name,
        email: result.email,
        subscription
    })
}

const login = async(req, res) => {
    const {email, password, subscription} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw HttpError(401, "Email or password invalid");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
    await User.findByIdAndUpdate(user._id, {token});

    res.json({
        token,
        email,
        subscription
    })
}

const getCurrent = async(req, res)=> {
    const {name, email, subscription} = req.user;

    res.json({
        name,
        email,
        subscription
    })
}

const logout = async(req, res)=> {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});

    res.status(204).json({
        message: "Logout success"
    })
}

const updateSubscription = async (req, res) => {
    const {_id, subscription} = req.user;

    const result = await User.findByIdAndUpdate(_id, subscription);
    if (!result) {
        throw HttpError(404, `User with ${_id} not found`);
    }
    res.json(result);

}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubscription: ctrlWrapper(updateSubscription)
}