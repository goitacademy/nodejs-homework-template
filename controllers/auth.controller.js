const HttpError = require("../helpers/HttpError");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    return HttpError(400, "Incorrect login or password");
  }

  const payload = {
    id: user.id,
    username: user.username,
  };

  const secret = process.env.SECRET;
  const token = jwt.sign(payload, secret, { expiresIn: "23h" });
  return res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).lean();

  if (user) {
    return HttpError(409, "Email is already in use");
  }
  try {
    const newUser = new User({ email });
    newUser.setPassword(password);
    await newUser.save();
    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        messsage: "Registration successful",
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, { token: "" });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(204).json({
    messsage: "Logout successful",
  });
};

const current = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    email,
    subscription,
  });
};

module.exports = {
  login,
  register,
  logout,
  current,
};
