const bcrypt = require("bcryptjs");
const createError = require("http-errors");

const { authServices } = require("../../services");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.getByEmail({ email });
  if (user) throw createError(409, "email is already registered");
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await authServices.register(email, hashPassword);
  res.status(201).json({
    status: "success",
    code: "201",
    payload: {
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    },
  });
};

module.exports = register;
