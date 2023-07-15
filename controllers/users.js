const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

// const SECRET_KEY = "y3nLgF4CisouJ2FP48Fi8ocsp4rMu5r3";

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: hashPassword });

    res.status(201).json({
      user: {
        subscription: newUser.subscription,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    const passwordCompare = bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    res.json({
      token,
      user: {
        email,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
