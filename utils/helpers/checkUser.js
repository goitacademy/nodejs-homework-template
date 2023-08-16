const bcrypt = require("bcryptjs");

const User = require("../../model/schemas/user");

const { AppError } = require("../errorHandlers/");

const checkUser = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) throw new AppError(401, "email or password is invalid");

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw new AppError(401, "email or password is invalid");
};

module.exports = checkUser;
