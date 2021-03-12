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
        name: newUser.name,
        email: newUser.email,
        subscription: newUser.subscription,
        id: newUser.id,
      },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UsersAPI.findByEmail(email);
    if (!user || !user.validPassword(password)) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        data: "Conflict",
        message: "Invalid credentials",
      });
    }
    const id = user._id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    await UsersAPI.updateToken(id, token);
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};
const logout = async (req, res, next) => {
  const id = req.user.id;
  await UsersAPI.updateToken(id, null);
  return res.status(HttpCode.NO_CONTENT).json({ message: "Nothing" });
};

module.exports = { reg, login, logout };
