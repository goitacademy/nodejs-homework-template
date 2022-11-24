const bcrypt = require("bcrypt");
const { RequestError } = require("../../helpers");
const { User } = require("../../models/user");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, `User with ${email} already exist`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({
    subscription,
    email,
    password: hashPassword,
  });
  res.status(201).json({
    user: {
      email,
      subscription,
    },
  });
};

module.exports = register;
