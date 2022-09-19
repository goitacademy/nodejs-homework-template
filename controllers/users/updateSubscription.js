const { users: operations } = require("../../services");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  await operations.updateSubscription(_id, subscription);

  res.status(200).json({ status: "success" });
};

module.exports = updateSubscription;
