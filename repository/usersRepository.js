const User = require("../schemas/usersSchemas");

const findUserByIdRepository = async (id) => {
  const results = await User.findOne({ _id: id });
  return results;
};

const findUserByEmailRepository = async (email) => {
  const results = await User.findOne({ email });
  return results;
};

const createContactRepository = async (body) => {
  const user = await User.create(body);
  return user.save();
};

const updateTokenRepository = async (id, token) => {
  await User.updateOne({ _id: id }, { token });
};

module.exports = {
  findUserByIdRepository,
  findUserByEmailRepository,
  createContactRepository,
  updateTokenRepository,
};
