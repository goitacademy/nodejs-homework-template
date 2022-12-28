const bcrypt = require("bcrypt");
const { Conflict } = require("http-errors");
const { User } = require("../../models/userModel");

const registerUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUserCreate = await User.create({ email, password: hashPassword });
    return newUserCreate;
  }
  throw new Conflict("Email in use");
};

module.exports = registerUser;
