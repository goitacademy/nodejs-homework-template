const { usersModel } = require("../../models/users");
const { HttpError } = require("../../Helpers");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await usersModel.findOne({ email: email });
  if (user) {
    throw HttpError(409, "User already exists");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = {
    ...req.body,
    password: hashPassword,
  };

  const resp = await usersModel.create(newUser);

  res.json({
    code: 201,
    message: "User registered successfully",
    resp,
  });
};

module.exports = register;
