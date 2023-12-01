const { User } = require("../../models");
const { decoratorCtrl } = require("../../helpers");
const { status } = require("../../consts");

const updateSubscription = async (req, res) => {
  const subscription = req.body;
  const { _id } = req.user;

  const user = await User.findByIdAndUpdate(_id, subscription, {
    new: true,
    select: "-_id email subscription",
  });

  res.json({ ...status.USER_UPDATE, user });
};

module.exports = decoratorCtrl(updateSubscription);
