const { userModel } = require("../../models/user");

const updateSubscription = async (userId, subscription) => {
  const data = await userModel.findByIdAndUpdate(userId, subscription, {
    new: true,
  });
  return data;
};

module.exports = updateSubscription;
