const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");
const { RequestError } = require("../../helpers");

const register = async (req, res) => {
  const { email, password, description, token } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const result = await User.create({
    email,
    password: hashPassword,
    description,
    token,
  });
  res.status(201).json({
    user: {
      email: result.email,
      subscription: "starter",
    },
  });
};
module.exports = register;
