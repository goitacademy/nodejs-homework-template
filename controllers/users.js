const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, schemas } = require("../models/user");
const { HttpError } = require("../helpers");
const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  try {
    const { error } = schemas.signUpSchema.validate(req.body);
    if (error) {
      throw HttpError(400, (message = "Invalid field value"));
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email already in use");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    res.status(201).json({
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { error } = schemas.loginSchema.validate(req.body);
    if (error) {
      throw HttpError(400, (message = "Invalid field value"));
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password invalid");
    }

    const payload = {
      id: user._id,
    };
    console.log(payload);
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "6d" });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
      token,
    });
  } catch (error) {
    next(error);
  }
};

const getCurrent = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.json({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.json({
      message: "Logout success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getCurrent,
  logout,
};