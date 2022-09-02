const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password } = req.body;
  console.log(User);
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, `Email ${email} already exsist`);
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ email, password: hashPassword });
  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
  });
};

module.exports = signup;
