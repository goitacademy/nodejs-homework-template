const { editSubscription } = require("../../services/users");

const changeSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;

  const user = await editSubscription(_id, subscription);
  res.json({
    status: "success",
    data: { email: user.email, subscription: user.subscription },
  });
};

module.exports = changeSubscription;
