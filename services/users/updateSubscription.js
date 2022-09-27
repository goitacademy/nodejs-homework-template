const { User } = require("../../models");
const { RequestError } = require("../../helpers");

const updateSubscription = async (id, subscription) => {
  const user = await User.updateOne({ _id: id }, { $set: { subscription } });

  if (!user) {
    throw RequestError(401, "Not authorized");
  }
};

module.exports = updateSubscription;
