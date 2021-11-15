const { Conflict } = require("http-errors");

const { User } = require("../../models");

const register = async (req, res) => {
  const { password, email, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with email = ${email} allready exist`);
  }
  const newUser = new User({ email, subscription });
  newUser.setPassword(password);
  await newUser.save();

  res.status(201).json({
    status: "success",
    code: 201,
    result: "Register success",
  });
};
module.exports = { register };
