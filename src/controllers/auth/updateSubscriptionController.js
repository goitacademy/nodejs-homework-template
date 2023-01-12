const { updateSubscription } = require("../../services/authService");

const updateSubscriptionController = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const user = await updateSubscription(_id, subscription);
  res.json(user);
};

module.exports = { updateSubscriptionController };
