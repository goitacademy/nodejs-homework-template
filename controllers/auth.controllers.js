const { addUser } = require("../models");
const bcrypt = require("bcrypt");

const userRegistration = async (req, res, next) => {
  const password = req.body.password;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  req.body.password = hashedPassword;
  const user = await addUser(req.body);
  res.status(201).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
};
module.exports = { userRegistration, userLogin };
