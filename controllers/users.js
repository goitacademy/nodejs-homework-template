const { HttpCode } = require('../helpers/constants')

const {
  signup,
  login,
  logout,
  getCurrent,
  updateUser,
  saveUserAvatar
} = require('../services/usersServices');

const signupController = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await signup(email, password);
  res.status(HttpCode.CREATED).json({
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  });
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  const loggedInUser = await login(email, password);
  res.status(HttpCode.OK).json({
    token: loggedInUser.token,
    user: {
      email: loggedInUser.email,
      subscription: loggedInUser.subscription,
    },
  });
};

const logoutController = async (req, res, next) => {
  const id = req.user.id;
  await logout(id);
  res.status(HttpCode.NO_CONTENT).json({});
};

const getCurrentUserController = async (req, res) => {
  const user = req.user;
  res.status(HttpCode.OK).json({
    email: user.email,
    subscription: user.subscription,
  });
};

const updateUserSubscriptionController = async (req, res) => {
  const userId = req.user.id;
  const updatedUser = await updateUser(userId, req.body);
  res.status(HttpCode.OK).json({
    currentUser: {
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    },
  });
};

const updateUserAvatarController = async (req, res) => {
  const { id } = req.user;
  const avatar = req.user.avatarURL;
  const avatarURL = await updateAvatar(id, req.file, avatar, saveUserAvatar);
  res.json({ avatarURL });
};

module.exports = {
  signupController,
  loginController,
  logoutController,
  getCurrentUserController,
  updateUserSubscriptionController,
  updateUserAvatarController
}