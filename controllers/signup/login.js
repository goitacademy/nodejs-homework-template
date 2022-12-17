const { Unauthorized } = require("http-errors");
const { User } = require("../../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  //   if (!user) {
  //     throw new Unauthorized("Email or password is wrong");
  //   }
  const comparePass = bcrypt.compareSync(password, user.password);
  if (!user || !comparePass) {
    throw new Unauthorized("Email or password is wrong");
  }
};
