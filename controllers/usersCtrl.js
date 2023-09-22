const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const HttpError = require("../helpers/HttpError");
const { User } = require("../schemas/ValidateAuth");

const { SECRET_KEY } = process.env;

const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const IfTakenEmail = await User.findOne({ email });
    if (IfTakenEmail) {
      throw HttpError(409, "Email is already taken");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    res.status(201).json({
      user: { email: newUser.email, subscription: newUser.subscription },
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password invalid");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password invalid");
    }
    const token = jwt.sign({ id: user._id }, SECRET_KEY, {
      expiresIn: "24h",
    });

    res.json({ token, user: { email, subscription: user.subscription } });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
