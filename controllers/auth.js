const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

const { controllersWraper, HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const register = async (rec, res) => {
  const { email, password } = rec.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "this email already use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...rec.body, password: hashPassword });

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "emeail or password wrong or invalid");
  }

  const comparePassword = bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw HttpError(404, "emeail or password wrong or invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "20h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
  });
};

const getCurrent = async (req, res) => {
  const { email, name } = req.user;
  console.log(req.user);
  res.json({
    email,
    name,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json("logout success");
};

module.exports = {
  register: controllersWraper(register),
  login: controllersWraper(login),
  getCurrent: controllersWraper(getCurrent),
  logout: controllersWraper(logout),
};
