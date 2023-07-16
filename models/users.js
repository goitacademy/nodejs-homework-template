const { User } = require("./schemas/user");

const createAcc = async ({ email, password }) => {
  return await User.create({ email, password });
};

const loginAcc = async ({ email }) => {
  return await User.findOne({ email });
}

module.exports = {
  createAcc,
  loginAcc
};

