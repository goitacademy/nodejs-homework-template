const { User } = require("../../models");
const { AuthError } = require("../../helpers");

const updateSubscription = async (id, subscription) => {
  const user = await User.updateOne({ _id: id }, { $set: { subscription } });

  if (!user) {
    throw new AuthError("Not authorized");
  }
};

module.exports = updateSubscription;
