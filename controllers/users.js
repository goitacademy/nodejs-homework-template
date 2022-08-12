const {
  getUser,
  updateSubscription,
  verification,
  reVerifi,
} = require("../services/usersService");

const getUserController = async (req, res) => {
  const { _id: userId } = req.user;

  const user = await getUser(userId);

  return res.status(200).json({ user, status: "success" });
};
const updateSubscriptionController = async (req, res) => {
  const { _id: userId } = req.user;
  const { subscription: sub } = req.body;
  const changedUser = await updateSubscription(userId, sub);

  return res.status(200).json({ changedUser, status: "success, user updated" });
};
const verificationController = async (req, res) => {
  const { email } = req.body;

  await reVerifi(email);
  if (!email) {
    return res.status(400).json({ message: "missing required field email" });
  }
  return res.status(200).json({ status: "success" });
};

const verificationTokenController = async (req, res) => {
  const { verificationToken: token } = req.params;
  await verification(token);
  return res.status(200).json({ status: "success" });
};
module.exports = {
  getUserController,
  verificationController,
  verificationTokenController,
  updateSubscriptionController,
};
