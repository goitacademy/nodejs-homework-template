/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable semi */
const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Email or password is wrong.");
    error.status = 401;
    // or use package "http-errors"
    throw error;
  }

  const passCompare = bcrypt.compareSync(password, user.password);
  if (!passCompare) {
    const error = new Error("Email or password is wrong.");
    error.status = 401;
    // or use package "http-errors"
    throw error;
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      token,
    },
  });
};

module.exports = login;
