const bcrypt = require("bcryptjs")
const { User } = require("../../models")
const { RequestError } = require("../../helpers")

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ email, password: hashPassword });
  res.status(201).json({
    email: newUser.email,
    subscription: "starter",
  })
}

module.exports = signup;