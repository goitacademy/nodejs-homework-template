const bcrypt = require("bcryptjs");
const { Conflict } = require("http-errors");

const { User } = require("../../models");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
    // return res.status(409).json({
    //   status: "Conflict",
    //   code: 409,
    //   message: "Email in use",
    // });
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({ email, password: hashPassword });
  res.status(201).json({
    status: "Created",
    code: 201,
    message: "Created",
  });
};

module.exports = signup;
