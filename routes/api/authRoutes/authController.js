const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../../../models/userModel");
const {HttpError} = require("../../../onError");
const { SECRET_KEY } = process.env;

class AuthController {
  userRegister = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Email is already in use",
        data: "Conflict",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    try {
      const newUser = await User.create({
        ...req.body,
        password: hashPassword,
      });

      res.status(201).json({
        status: "success",
        code: 201,
        data: {
          message: "Registration successful",
          email: newUser.email,
        },
      });
    } catch (error) {
      next(error);
    }
  });

  userLogin = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      throw HttpError(401);
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    console.log(checkPassword)
    if (!checkPassword) {
      throw HttpError(401);
    }
    const {id} = user;
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(id, { token });
    res.json({
      token,
    });
  });

  userLogout = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.json({
      message: "Logout success",
    });
  });

  userCurrent = asyncHandler(async (req, res, next) => {
    const { email, subscription } = req.user;

    res.json({
      email,
      subscription,
    });
  });
}

module.exports = new AuthController();
