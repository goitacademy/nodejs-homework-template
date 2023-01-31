const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const SECRET_KEY = process.env.SECRET;

const { User } = require("../models/userModels");

const ctrlSignup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.json({
        status: "error",
        code: 409,
        message: "Email in use",
        data: "Conflict",
      });
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    await User.create({ name, email, password: hashPassword });

    res.json({
      status: "Created",
      code: 201,
      data: {
        message: "Registration successful",
      },
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const ctrlLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!user || !validPassword) {
      return res.json({
        status: "error",
        code: 401,
        message: "Email or password is wrong",
        data: "Bad request",
      });
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });

    res.json({
      status: "success",
      code: 200,
      data: {
        token,
      },
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const ctrlCurrent = async (req, res, next) => {
  try {
    const { name, email } = req.user;

    res.json({
      status: "success",
      code: 200,
      data: {
        user: {
          name,
          email,
        },
      },
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = {
  ctrlSignup,
  ctrlLogin,
  ctrlCurrent,
};
