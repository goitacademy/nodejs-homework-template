const jwt = require("jsonwebtoken");
const Users = require("../model/users");
const { HttpCode } = require("../helpers/constants");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET;

const registration = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await Users.findByEmail(email);

    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: "error",
        code: HttpCode.CONFLICT,
        data: "conflict",
        message: "Email is already used",
      });
    }
    const newUser = await Users.create(req.body);
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findByEmail(email);
    const isValidPassword = await user.validatePassword(password);

    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORISED).json({
        status: "error",
        code: HttpCode.UNAUTHORISED,
        data: "Unauthorised",
        message: "Invalid credentials",
      });
    }
    const id = user._id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "30h" });
    await Users.updateToken(id, token);

    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        token,
      },
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  const id = req.user.id;
  await Users.updateToken(id, null);
  return res.status(HttpCode.NO_CONTENT).json({ message: "Nothing" });
};

const updateSubscriptionById = async (req, res, next) => {
  try {
    // const id = req.body.id;
    const id = req.params.id;
    console.log(
      "🚀 ~ file: usersController.js ~ line 83 ~ updateSubscriptionById ~ id",
      id
    );

    const { subscription } = await Users.updateSubscription(id, req.body);
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        subscription,
        message: `Greetings with changeing your subscription to ${[
          subscription,
        ]}`,
      },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = { registration, login, logout, updateSubscriptionById };
