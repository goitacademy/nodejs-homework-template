const { NotFound } = require("http-errors");
const { User } = require("../../models");

const getAll = async (req, res) => {
  const users = await User.find();
  if (!users.length === 0) {
    throw new NotFound(`Users not found`);
  } else {
    res.json(users);
  }
};

module.exports = { getAll };
