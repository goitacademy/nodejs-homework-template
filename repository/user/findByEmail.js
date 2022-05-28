const { User } = require("../../model");

const findById = async (email) => {
  return await User.findOne({ email });
};

module.exports = findById;
