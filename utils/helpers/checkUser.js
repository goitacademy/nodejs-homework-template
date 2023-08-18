const bcrypt = require("bcryptjs");

const User = require("../../model/schemas/user");

const { AppError } = require("../errorHandlers/");

const checkUser = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) throw new AppError(401, "email or password is invalid!!1");

  const passwordCompare = await bcrypt.compare(password, user.password);
  console.log("passwordCompare", passwordCompare);
  console.log("user.password", user.password);

  if (!passwordCompare)
    throw new AppError(401, "email or password is invalid!!!2");

  if (!user.verify) {
    throw new AppError(401, "Please verify your email first");
  }
};

module.exports = checkUser;
