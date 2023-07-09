const { User, authSchemas } = require("../models");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const { RequestError } = require("../helpers");

const register = async (req, res, next) => {
  try {
    // const {email} = req.body;
    // const user = await User.findOne({email})
    // if (user) {
    //    throw RequestError(409,"Email in use")
    // }
    const { password } = req.body;
    const { error } = authSchemas.registerSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });
    //   if (!newUser) {
    //     throw RequestError(404, "Not found");
    //   }
    res.status(201).json({
      email: newUser.email,
      subscription: newUser.subscription,
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
      throw RequestError(401, " Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw RequestError(401, " Email or password is wrong");
    }

    const { error } = authSchemas.registerSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    next(error);
  }
};

const getCurrent = (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.json({
      email,
      subscription,
    });
  } catch (error) {
    next(RequestError(401));
  }
};

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
  } catch (error) {
    next(RequestError(401));
  }
  res.status(204).json({ message: "No Content" });
};

module.exports = {
  register,
  login,
  getCurrent,
  logout,
};
