const bcrypt = require("bcryptjs");

const User = require("../../model/schemas/user");

const { AppError } = require("../errorHandlers/");

const checkUser = async (data) => {
  const { email, password } = data;
  console.log(data);

  const user = await User.findOne({ email });
  console.log(user);
  if (!user) throw new AppError(401, "email or password is invalid!!1");

  const passwordCompare = await bcrypt.compare(password, user.password);
  console.log("passwordCompare", passwordCompare);
  console.log("user.password", user.password);

  if (!passwordCompare)
    throw new AppError(401, "email or password is invalid!!!2");
};

module.exports = checkUser;
