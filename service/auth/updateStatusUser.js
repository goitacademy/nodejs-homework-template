const { User } = require("../../models/userModel");

const updateStatusUser = async (id, status) => {
  const user = await User.findByIdAndUpdate(id, status, {
    new: true,
  });
  return {
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
};

module.exports = updateStatusUser;
