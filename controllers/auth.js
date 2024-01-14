const { envsConfig } = require("../configs");
const { ctrlWrapper } = require("../decorators");
const { httpError } = require("../helpers");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const register = async (req, res) => {
  const { email } = req.body;
  const isExist = await User.findOne({ email });

  if (isExist) {
    throw httpError(409, `User with email ${email} already exists`);
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const { email: userEmail, name } = await User.create({
    ...req.body,
    password: hashedPassword,
  });
  res.status(201).json({ userEmail, name });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const isExist = await User.findOne({ email });

  if (!isExist) {
    throw httpError(401, `Email or password is wrong`);
  }

  const isPasswordSame = bcrypt.compare(password, isExist.password);
  if (!isPasswordSame) {
    throw httpError(401, "Email or password is wrong");
  }

  const token = await jsonwebtoken.sign(
    { id: isExist.id },
    envsConfig.jwtSecret
  );
  await User.findByIdAndUpdate(isExist.id, { token });

  res.json({
    user: {
      email: isExist.email,
      name: isExist.name,
    },
    token,
  });
};

const current = async (req, res) => {
  const { email, name } = req.user;

  res.json({ email, name });
};

const logout = async (req, res) => {
  const { id } = req.user;

  await User.findByIdAndUpdate(id, { token: null });

  res.json({ message: "Logout successful" });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
};
