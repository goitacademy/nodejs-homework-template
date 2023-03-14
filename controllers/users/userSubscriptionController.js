const { userSubscription } = require("../../service/users");
const userSubscriptionController = async (req, res) => {
  const { id } = req.user;
  const { subscription } = req.body;
  const data = await userSubscription(id, subscription);
  res.json({
    status: "success",
    data: { email: data.email, subscription: data.subscription },
  });
};
module.exports = userSubscriptionController;
