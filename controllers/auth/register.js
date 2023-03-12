const bcrypt = require("bcrypt");

require("dotenv").config();

const gravatar = require("gravatar");

const { User } = require("../../models");

const { HttpError } = require("../../utils");

const register = async (request, response) => {
  const { email, password } = request.body;
  const result = await User.findOne({ email });

  if (result) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const user = await User.create({
    ...request.body,
    password: hashPassword,
    avatarURL,
  });

  response.status(201).json({
    status: "success",
    code: 201,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = register;
