const { User } = require("../../models");
const { BadRequest, NotFound } = require("http-errors");

const enumSubscription = new Set(); // "starter", "pro", "business"
enumSubscription.add("starter");
enumSubscription.add("pro");
enumSubscription.add("business");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription = null } = req.body;

  if (subscription === null || !enumSubscription.has(subscription)) {
    throw new BadRequest();
  }
  const updUser = await User.findByIdAndUpdate(_id, { subscription }, { new: true });
  if (!updUser) {
    throw NotFound("Not found");
  }

  res.json(updUser);
};

module.exports = updateSubscription;
