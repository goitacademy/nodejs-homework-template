const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const { userModel } = require("../../models/user");
const { authServices } = require("../../services");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.getByEmail({ email });
  if (user) throw createError(409, "email is already registered");
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await userModel.create({ email, password: hashPassword });
  res.status(201).json({
    status: "success",
    data: {
      user: result,
    },
  });
};

module.exports = register;
