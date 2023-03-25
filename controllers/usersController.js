const {
  registration,
  logIn,
  logOut,
  currentUser,
  changeUserSubscription,
} = require("../services/userServices");

const registrationController = async (req, res) => {
  const { email, subscription } = await registration(req.body);

  res.status(201).json({
    message: "New user has been created!",
    status: "created",
    code: "201",
    user: {
      email,
      subscription,
    },
  });
};

const logInController = async (req, res) => {
  const { email, password } = req.body;

  const { token, user } = await logIn(email, password);

  res.status(200).json({
    status: "success",
    code: "200",
    token,
    user,
  });
};

const logOutController = async (req, res) => {
  const { _id } = req.user;

  await logOut(_id);

  res.status(200).json({ message: "Logout successful" });
};

const currentUserController = async (req, res) => {
  const { _id } = req.user;

  const { email, subscription } = await currentUser(_id);

  res.status(200).json({
    status: "success",
    code: "200",
    user: {
      email,
      subscription,
    },
  });
};

const subscriptionUserController = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  await changeUserSubscription(_id, { subscription });

  res.status(200).json({
    status: "success",
    code: "200",
    user: {
      subscription,
    },
  });
};

module.exports = {
  registrationController,
  logInController,
  logOutController,
  currentUserController,
  subscriptionUserController,
};
