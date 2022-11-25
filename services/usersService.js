const { User } = require("../schemas/usersSchema");

const createUser = async ({ password, email, subscription }) =>
  await User.create({ password, email, subscription });
