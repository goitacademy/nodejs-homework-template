const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { HttpError } = require("../helpers");
const User = require("../models/user");

const {SECRET_KEY} = process.env;

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });

    res.json({ 
      status: "User created",
      code: 201,
      data: {
        email: newUser.email,
        subscription: newUser.subscription
      },
    })
  } catch (er) {
    next(er);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
    await User.findByIdAndUpdate(user._id, {token});

    res.json({
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        }
    })
    
  } catch (er) {
    next(er);
  }
};

const getCurrent = async(req, res, next) => {
  try {
    const {email, subscription} = req.user;
    res.json({
      email,
      subscription
    })
  }
  catch(er) {
    next(er);
  }
}

const logout = async(req, res, next) => {
  try {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});

    res.json({
      code: 204,
      message: "No Content",
    });
  }
  catch(er) {
    next(er);
  }
}

const updateSubscription = async (req, res, next) => {
  try {
    const {_id} = req.user;

    await User.findByIdAndUpdate(_id, req.body);

    res.json({ 
      status: "success",
      code: 200,
      message: "Subscription was updated successfully"
    })
  }
  catch (er) {
    next(er)
  }
}

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription
};
