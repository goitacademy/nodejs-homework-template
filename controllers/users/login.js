const { Unauthorized } = require("http-errors");
const { User } = require("../../models");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const passCompare = bcrypt.compareSync(password, user.password);
  if (!user || !passCompare) {
    throw new Unauthorized("Email or password is wrong");
  }
};

module.exports = login;
