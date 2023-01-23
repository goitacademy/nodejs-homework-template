const {
  signupUser,
  loginUser,
  patchSubscriptionUser,
  getCurrentUser,
  uploadUserAvatar,
  verificationUser,
  repeatedVerifictaionUser,
} = require("../models/users");
const { User } = require("../db/userModel");

const signupUserController = async (req, res) => {
  const { email, password } = req.body;

  const user = await signupUser(email, password);
  res
    .status(201)
    .json({
      status: "success",
      email: user.email,
      subscription: user.subscription,
    });
};

const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  const token = await loginUser(email, password);
  res.status(200).json({ status: "success", token });
};

const patchSubscriptionUserController = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const updatedUser = await patchSubscriptionUser(_id, subscription);

  res.status(200).json({ message: "success", user: updatedUser });
};

const getCurrentUserController = async (req, res) => {
  const { _id } = req.user;

  const user = await getCurrentUser(_id);

  res.status(200).json({ status: "success", user });
};

const logoutUserController = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: null }, { runValidators: true });
  res.status(200).json({ message: "Success logout" });
};

const patchUserAvatarController = async (req, res) => {
  const { filename } = req.file;
  const { _id } = req.user;
  const updatedUser = await uploadUserAvatar(_id, filename);

  res.status(200).json({ status: "success", user: updatedUser });
};

const verifictaionUserController = async (req, res) => {
  const { verificationToken } = req.params;

  await verificationUser(verificationToken);
  res.status(200).json({ message: "Verification successful" });
};

const repeatedVerifictaionUserController = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: "missing required field email" });
  }

  await repeatedVerifictaionUser(email);
  res.status(200).json({ message: "Verification email sent" });
};

module.exports = {
  signupUserController,
  loginUserController,
  patchSubscriptionUserController,
  getCurrentUserController,
  logoutUserController,
  patchUserAvatarController,
  verifictaionUserController,
  repeatedVerifictaionUserController,
};
