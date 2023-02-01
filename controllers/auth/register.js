const { Conflict } = require("http-errors");
const { User } = require("../../models");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { name, password, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email ${email} in use`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const newUser = await User.create({ name, password: hashPassword, email });
  // newUser.setPassword(password);
  // await newUser.save();
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        name,
        email,
        // password: newUser.password,
        subscription: newUser.subscription,
      },
    },
  });
};
module.exports = register;
