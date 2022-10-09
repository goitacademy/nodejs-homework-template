const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const gravatar = require("gravatar");

const { authServices } = require("../../services");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.getByEmail({ email });
  if (user) throw createError(409, "email is already registered");

  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await authServices.register(email, hashPassword, avatarURL);
  res.status(201).json({
    status: "success",
    code: "201",
    payload: {
      user: {
        email: result.email,
        subscription: result.subscription,
        avatarURL,
      },
    },
  });
};

module.exports = register;
