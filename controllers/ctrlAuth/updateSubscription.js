const { authService } = require("../../services");
const { setApiErrorStatus } = require("../../helpers");

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;

  if (subscription === undefined) {
    return setApiErrorStatus(400, "Missing subscription field");
  }

  const user = await authService.updateUser(_id, { subscription });

  res.json({ email: user.email, subscription: user.subscription });
};

module.exports = updateSubscription;