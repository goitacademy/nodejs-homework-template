const bcrypt = require("bcryptjs");
const User = require("../../models/auth");
const RequestError = require("../../helpers/RequestError");
const schema = require("../../schemas/schemas");

const register = async (req, res) => {
  const { password, email } = req.body;
  const { error } = schema.register.validate(req.body);

  if (error) {
    throw RequestError(400);
  }

  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, "This email already used");
  }
  const hashPass = await bcrypt.hash(password, 10);
  const result = await User.create({ email, password: hashPass });

  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
  });
};

module.exports = register;
