const { User } = require("../../models/userAuth");
const bcrypt = require("bcryptjs");
const { RequestError } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ email, password: hashPassword });
  console.log(result);
  res.status(201).json({
    email: result.email,
    password: result.password,
  });
};

module.exports = register;
