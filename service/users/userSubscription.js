const { User } = require("../../models");
const userSubscription = async (userId, subscription) => {
  const data = await User.findByIdAndUpdate(
    { _id: userId },
    { subscription },
    {
      new: true,
    }
  );
  return data;
};
module.exports = userSubscription;
