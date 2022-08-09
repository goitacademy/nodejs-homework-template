const { getUser, updateSubscription } = require("../services/usersService");

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

module.exports = {
  getUserController,
  updateSubscriptionController,
};
