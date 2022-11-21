const { User } = require("../db/userModel");
const { ConflictError, WrongParametersError } = require("../helpers/errors");
const {
  registration,
  login,
  logout,
  currentUser,
  changeSubscription,
  changeAvatar,
} = require("../services/authServices");

const registrationController = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ConflictError(409);
  }

  await registration(email, password);
  res.status(201).json({
    Status: "201 Created",
    "Content-Type": "application/json",
    ResponseBody: {
      user: {
        email,
        subscription: "starter",
      },
    },
  });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const token = await login(email, password);
  return res.status(200).json({
    Status: "200 OK",
    "Content-Type": "application/json",
    ResponseBody: {
      token,
      user: {
        email,
        subscription: user.subscription,
      },
    },
  });
};

const logoutController = async (req, res) => {
  await logout(req.user);

  res.status(204).json({
    Status: "204 No Content",
  });
};

const currentUserController = async (req, res) => {
  const { email, subscription } = await currentUser(req.user._id);

  res.status(200).json({
    Status: "200 OK",
    "Content-Type": "application/json",
    ResponseBody: {
      email,
      subscription,
    },
  });
};

const updateSubscriptionController = async (req, res) => {
  const { subscription } = req.body;
  const availableSubscriptions = ["starter", "pro", "business"];
  if (!availableSubscriptions.includes(subscription)) {
    throw new WrongParametersError("Wrong type of subscription");
  }
  await changeSubscription(req.user._id, subscription);
  res.json({
    status: "success",
    status_code: 200,
    subscription,
    message: "Subscription has been successfully changed",
  });
};

const uploadImageController = async (req, res) => {
  const { path, filename } = req.file;
  const { _id } = req.user;
  const avatarURL = await changeAvatar(path, filename, _id);
  res.status(200).json({
    Status: "200 OK",
    "Content-Type": "application/json",
    ResponseBody: {
      avatarURL,
    },
  });
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
  updateSubscriptionController,
  uploadImageController,
};
