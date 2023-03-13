const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const gravatar = require("gravatar");

const { RequestError } = require("../../helpers");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const avatarURL = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({
    name,
    email,
    password: hashPassword,
    avatarURL,
  });
  console.log(result);
  res.status(201).json({
    user: {
      name: result.name,
      email: result.email,
      avatarURL,
    },
  });
};

module.exports = register;
