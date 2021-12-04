const { HTTP401Error } = require("../../helpers/errorHandlers");
const User = require("../../models/users");

const editSubscription = async (id, value) => {
  const user = await User.findByIdAndUpdate(
    id,
    { subscription: value },
    { new: true }
  );
  if (!user) {
    throw new HTTP401Error("Not authorized");
  }
  return user;
};

module.exports = editSubscription;
