const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const { User } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  console.log("hashPass: ", hashPassword);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    user: {
      email: newUser.email,
      name: newUser.name,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // console.log("ID: ", user);

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  console.log(token);

  await User.findByIdAndUpdate(user._id, { token });

  // const decodeToken = jwt.decode(token);
  // console.log(decodeToken);

  // try {
  //   const { id } = jwt.verify(token, SECRET_KEY);
  //   console.log(id);
  // } catch (error) {
  //   console.log(error.message);
  // }

  // res.json({
  //   token,
  // });

  res.json({
    token: token,
    user: {
      email,
      subscription: "starter",
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, name } = req.user;
  res.json({ email, name });
};

const logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({ message: "Logout seccess" });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
};
