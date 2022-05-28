const { User } = require("../../model");

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

module.exports = updateToken;
