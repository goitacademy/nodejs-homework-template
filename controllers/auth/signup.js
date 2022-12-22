const { Conflict } = require("http-errors");
// const bcrypt = require("bcryptjs");
const { User } = require("../../models");

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const dublicateUser = await User.findOne({ email });
  if (dublicateUser) {
    throw new Conflict("Email  in use");
  }
  const newUser = new User({ subscription, email });
  newUser.setPassword(password);
  newUser.save();

  // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  // await User.create({
  //   email,
  //   password: hashPassword,
  //   subscription,
  // });
  res.status(201).json({
    ResponseBody: {
      email,
      subscription,
    },
  });
};

module.exports = signup;
