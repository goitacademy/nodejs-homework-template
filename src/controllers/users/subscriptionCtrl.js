const { updateUser } = require("../../services");

const SUBSCRIPTION_TYPE = ["starter", "pro", "business"];

const subscriptionCtrl = async (req, res) => {
  const { id } = req.user;
  const { subscription } = req.body;

  if (!SUBSCRIPTION_TYPE.includes(subscription)) {
    return res.status(400).json({ message: "Ivalid subscription type" });
  }

  const updateSubscription = await updateUser(id, req.body);

  if (!updateSubscription) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  return res.status(200).json({ message: "Subscription updated" });
};

module.exports = subscriptionCtrl;
