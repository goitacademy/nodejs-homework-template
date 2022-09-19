const {
  userSignUp,
  userLogin,
  userLogout,
  getCurrentUser,
  updateUserSubscription,
  updateUserAvatar,
} = require("../models/users");
const {
  UnauthorizedError,
  ConflictError,
  PutContactError,
  UpdateAvatarError,
} = require("../helpers/errors");

const userSignUpController = async (req, res) => {
  const { email: userEmail, password } = req.body;

  const { email, subscription } = await userSignUp(userEmail, password);

  if (!email) {
    throw new ConflictError("Email in use");
  }

  res.status(201).json({
    user: {
      email,
      subscription,
    },
  });
};

const userLoginController = async (req, res) => {
  const { email: userEmail, password } = req.body;

  const { token, email, subscription } = await userLogin(userEmail, password);

  if (!token) {
    throw new UnauthorizedError("Email or password is wrong");
  }

  res.status(200).json({
    token,
    user: {
      email,
      subscription,
    },
  });
};

const userLogoutController = async (req, res) => {
  const { _id: id } = req.user;

  const response = await userLogout(id);

  if (response) {
    throw new UnauthorizedError("Not authorized");
  }
  res.status(204).json();
};

const updateSubscriptionController = async (req, res) => {
  const { _id } = req.user;
  const data = await updateUserSubscription(_id, req.body);

  if (!data || !data.length) {
    throw new PutContactError("Not found");
  }

  res.status(200).json({ message: data });
};

const getCurrentUserController = async (req, res) => {
  const token = req.token;
  const user = await getCurrentUser(token);

  if (!user) {
    throw new UnauthorizedError("Not authorized");
  }
  res.status(200).json({
    user,
  });
};

const updateAvatarController = async (req, res) => {
  if (!req.file) {
    throw new UpdateAvatarError("Avatar is required");
  }
  const { _id } = req.user;
  const { path } = req.file;
  const data = await updateUserAvatar(_id, path);

  if (!data || !data.length) {
    throw new PutContactError("Not found");
  }

  res.status(200).json({ data });
};

module.exports = {
  userSignUpController,
  userLoginController,
  userLogoutController,
  getCurrentUserController,
  updateSubscriptionController,
  updateAvatarController,
};
