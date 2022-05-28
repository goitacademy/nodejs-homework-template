const { User } = require("../../model");

const findById = async (id) => {
  return await User.findById(id);
};

module.exports = findById;
