const jwt = require("jsonwebtoken");
const Users = require("../../model/user");
const { Unauthorized } = require("http-errors");
const { bcrypt } = require("bcryptjs");
// const { Conflict } = require("http-errors");
// const { HttpCode } = require("../../service/httpcode");
require("dotenv").config();
// const SECRET_KEY = process.env.JWT_SECRET;
const SECRET_KEY = process.env.JWT_SECRET;
console.log(SECRET_KEY);

const register = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await Users.findByEmail(email);
    if (user) {
      return next({
        status: 409,
        message: "Email in use",
      });
    }
    const newUser = await Users.create(req.body);
    return res.status(201).json({
      // status: "success",
      // code: 201,
      // data: {
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
      // },
    });
  } catch (error) {
    if (e.name === "ValidationError" || e.name === "MongoError") {
      return next({
        status: 400,
        message: e.message.replace(/"/g, ""),
      });
    }
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findByEmail(email);
    console.log(email);
    console.log(password);
    const isValidPassword = await user.validPassword(password);
    // const isCorrectPassword = bcrypt.compareSync(password, user.password);
    // if (!isCorrectPassword) {
    //   throw new Unauthorized(`Password wrong`);
    // }
    // if (!user.comparePassword(password)) {
    //   throw new Unauthorized(`Password wrong`);
    // }
    console.log(isValidPassword);

    if (!user || !isValidPassword) {
      return next({
        status: 401,
        message: "Email or password is wrong",
      });
    }
    const id = user._id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    await Users.updateToken(id, token);
    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    if (error.name === "TypeError") {
      return next({
        status: 400,
        message: "Bad request",
      });
    }
    next(error);
  }
};

const logout = async (req, res, _next) => {
  const id = req.user.id;
  await Users.updateToken(id, null);
  return res.status(204).json({});
};

const currentUser = async (req, res, next) => {
  const id = req.user.id;
  try {
    const user = await Users.findById(id);
    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateSub = async (req, res, next) => {
  const id = req.user.id;
  try {
    await Users.updateSubUser(id, req.body.subscription);
    const user = await Users.findById(id);
    return res.json({
      status: "success",
      code: 200,
      data: {
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    if (error.name === "CastError") {
      return next({
        status: 404,
        message: "Not Found",
      });
    }
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  currentUser,
  updateSub,
};
