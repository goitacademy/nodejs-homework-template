const { Conflict } = require("http-errors");
// const bcrypt = require("bcryptjs");

const { User } = require("../../models");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized("Email or password is wrong!");
  }

  // if (!user) {
  //   throw new Unauthorized(`Email ${email} not found`);
  // }
  // const passCompare = bcrypt.compareSync(password, user.password);
  // if (!passCompare) {
  //   throw new Unauthorized(`Email or password is wrong`);
  // }
};

module.exports = login;
