const Errors = require("http-errors");
const {
  authModel: { UserModel },
} = require("../models");
const { token } = require("../utils");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    throw new Errors.Conflict("Already account exist");
  }

  const newUser = new UserModel({ email });
  newUser.setPass(password);
  newUser.setAvatar(email);
  const userToken = token.get(newUser._id);
  newUser.setToken(userToken);
  await newUser.save();

  res.status(201).json({
    message: "user created",
    token: userToken,
    user: {
      email: newUser.email,
      id: newUser._id,
      avatarURL: newUser.avatarURL,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Errors.NotFound("Email is not found");
  }

  const isCorrectPass = user.isValid(password, user.password);

  if (!isCorrectPass) {
    throw new Errors.Unauthorized("Wrong password");
  }

  const userToken = token.get(user._id);
  await UserModel.findByIdAndUpdate(user._id, { token: userToken });

  res.status(200).json({
    token: userToken,
    user: {
      email: user.email,
      id: user._id,
      avatarURL: user.avatarURL,
    },
  });
};

const logout = async (req, res) => {
  const { userId } = req.params;
  const user = await UserModel.findByIdAndUpdate(userId, { token: "" });
  if (!user.token) {
    throw new Errors.Unauthorized("not authorization");
  }
  token.clear();
  res.status(200).json({ email: user.email });
};

module.exports = { signup, login, logout };
