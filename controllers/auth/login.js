const bcrypt = require("bcryptjs");
const RequestError = require("../../helpers/RequestError");
const User = require("../../models/auth");
const schema = require("../../schemas/schemas");

const login = async (req, res) => {
  const { email, password } = req.body;
  const { error } = schema.login.validate(req.body);

  if (error) {
    throw RequestError(400);
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, `There is no user with email ${email}`);
  }
  const comparedPass = await bcrypt.compare(password, user.password);
  if (!comparedPass) {
    throw RequestError(401, "Email or password is incorrect");
  }
  res.json(user);
};

module.exports = login;
