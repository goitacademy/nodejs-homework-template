const { User } = require("../../db");

const updateSubscription = async (id, subscription) => {
  await User.findByIdAndUpdate(id, {
    $set: { subscription: subscription },
  });
  const user = User.findById(id);
  return user;
};

module.exports = { updateSubscription };
