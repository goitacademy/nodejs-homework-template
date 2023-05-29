const asyncHandler = require("express-async-handler");
const { HttpError } = require("../../helpers");
const { userSchema } = require("../../schemas");
const { UserServices } = require("../../services");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const register = asyncHandler(async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { email, password: pass } = req.body;
  const userCheck = await UserServices.findUser(email);
  console.log(userCheck);
  if (userCheck !== null) {
    throw HttpError(409, "Email in use");
  }
  const hashedPassword = await bcrypt.hash(pass, saltRounds);
  const result = await UserServices.register(email, hashedPassword);
  const resMesage = {
    user: {
      email: result.email,
      subcription: result.subscription,
    },
  };
  res.status(201).json({ status: 201, message: "Success", data: resMesage });
});

module.exports = register;
