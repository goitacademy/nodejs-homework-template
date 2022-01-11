// const bcrypt = require("bcrypt");
const { User } = require("../../models");
const { Conflict } = require("http-errors");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with email=${email} already exists`);
  }
  //Cоздание с помощью схемы
  const newUser = new User({ email });
  newUser.setPassword(password);
  await newUser.save();

  // Второй вариант
  //   const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  //   const newUser = await User.create({ email, password: hashPassword, subscription });

  res.status(201).json({
    status: "success",
    code: 201,
    message: "Register success",
    data: {
      email,
      subscription: newUser.subscription,
    },
  });
};
module.exports = signup;
