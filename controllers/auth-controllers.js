const Schemas = require("../Shemas/Shemas");
const {ctrlWrapper} = require("../utils/ctrlWrapper.js");
const User = require("../models/user-model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {SECRET_KEY} = process.env;

const register = async(req, res) => {
    const {email, password} = req.body;
    const {error} = Schemas.registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({"message": "Ошибка от Joi или другой библиотеки валидации"});
    }
    const user = await User.findOne({email});
    if (user) {
      return res.status(409).json({"message": "Email in use"})
    };
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await User.create({...req.body, password: hashPassword});
    res.status(201).json({
        email: result.email,
        subscription: "starter",
    });
};

const login = async(req, res) => {
    const {email, password} = req.body;
    const {error} = Schemas.registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({"message": "Ошибка от Joi или другой библиотеки валидации"});
    } 
    const user = await User.findOne({email});
    if (!user) {
        return res.status(401).json({"message": "Email or password is wrong"})
        
    };
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
        return res.status(401).json({"message": "Email or password is wrong"});
    }
    const payload = {
        id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "24h"});
    await User.findByIdAndUpdate(user._id, { token });
    res.json({token});
};

const getCurrent = async(req, res) => {
    const {email, subscription} = req.user;
    res.json({email, subscription});
};

const logout = async(req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});
    res.status(204).json()
};

const updateSubscription = async (req, res) => {
    const {error} = Schemas.updateSubscription.validate(req.body);
    if (error) {
      return res.status(400).json({"message": "Ошибка от Joi или другой библиотеки валидации"});
    } 
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { subscription: req.body.subscription });
    res.status(200).json({"message": "Subsription updated"})
};

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubscription: ctrlWrapper(updateSubscription),
};