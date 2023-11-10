const { registerSchema } = require("../../models/user");
const HttpError = require("../../helpers/HttpError");
const { User } = require("../../models/user");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const register = async (req, res) => {
  const { email, password, name } = req.body;
  const { error } = registerSchema.validate(req.body);
  if (error) {
    error.status = 400;
    throw error;
  }
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const avatarURL = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 12);
  const newUser = await User.create({
    email,
    password: hashPassword,
    name,
    avatarURL,
  });
  console.log(newUser);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription: newUser.subscription,
      },
    },
  });
};

module.exports = register;
