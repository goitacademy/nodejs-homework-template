/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable semi */
const { User } = require("../../models");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const error = new Error(`User ${email} - is already exist.`);
    error.status = 409;
    // or use package "http-errors"
    throw error;
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({ name, email, password: hashPassword });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        name,
      },
    },
  });
};

module.exports = register;
