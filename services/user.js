const { User } = require("../model");

const getOne = async (filter) => {
  return await User.findOne(filter);
};

const add = async ({ email, password }) => {
  return await User.create({ email, password });
};

module.exports = { getOne, add };
