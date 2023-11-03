const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { config } = require("dotenv");

config();

const { User } = require("../../models");

const { HttpError } = require("../../helpers");

const { controllerWrapper } = require("../../decorators");

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, `${email} already in use`);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
  });

  res.status(201).json({
    username: newUser.username,
    email: newUser.email,
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, `Email or password invalid`);
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, `Email or password invalid`);
  }

  const payload = { id: user._id };

  const token = sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({ token });
};

const getCurrent = async (req, res) => {
  const { username, email } = req.user;

  res.json({ username, email });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
};

module.exports = {
  signup: controllerWrapper(signup),
  signin: controllerWrapper(signin),
  getCurrent: controllerWrapper(getCurrent),
};
