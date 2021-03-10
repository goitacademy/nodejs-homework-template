const UsersAPI = require("../model/usersAPI.js");
const { HttpCode } = require("../helpers/constants.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET;

const reg = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await UsersAPI.findByEmail(email);
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: "error",
        code: HttpCode.CONFLICT,
        data: "Conflict",
        message: "Email in use",
      });
    }
    const newUser = await UsersAPI.create(req.body);
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {};
const logout = async (req, res, next) => {};

module.exports = { reg };
