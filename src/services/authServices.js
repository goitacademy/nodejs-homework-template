const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../bd/Cshema");
const { NotAuthorizeError } = require("../helpers/errors");

const registration = async (email, password) => {
  const user = new User({ email, password });
  await user.save();
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotAuthorizeError(`No user with ${email} found`);
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizeError("Wrong password");
  }
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  return { token, user };
};

module.exports = { registration, login };
