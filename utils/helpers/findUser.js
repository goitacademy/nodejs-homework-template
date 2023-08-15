const User = require("../../model/schemas/user");

const { AppError } = require("../errorHandlers/");

const findUser = async (data) => {
  const { email } = data;

  const user = await User.findOne({ email });

  if (user) throw new AppError(409, "Email in use");
};

module.exports = findUser;
