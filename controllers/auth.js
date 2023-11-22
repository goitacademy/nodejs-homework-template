const { User } = require("../models/user");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const { handleHttpError, wrapController } = require("../utils");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw handleHttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });
  console.log(newUser);
  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  const user = await User.findOne({ email });

  if (!user) {
    throw handleHttpError(401, "Email or password is invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw handleHttpError(401, "Email or password is invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({ token });
};

const getCurrent = async (req, res) => {
  const { name, email } = req.user;

  res.json({ name, email });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({ message: "Logout success" });
};

module.exports = {
  register: wrapController(register),
  login: wrapController(login),
  getCurrent: wrapController(getCurrent),
  logout: wrapController(logout),
};
