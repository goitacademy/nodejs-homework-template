const { User } = require("../db/userModel");
const { WrongParametersError } = require("../Helpers/errors");

const updateToken = async (userId, token) => {
  const data = await User.findOneAndUpdate(
    { _id: userId },
    { token: token },
    { new: true }
  );
  return data;
};

module.exports = {
  updateToken,
};
