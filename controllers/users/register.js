const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { User, schemas } = require("../../models/user");
const { RequestError } = require("../../helpers");

const register = async (req, res) => {
  const { error } = schemas.registerSchema.validate(req.body);
  if (error) {
    throw RequestError(400, error.message);
  }
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
  });
  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = register;
