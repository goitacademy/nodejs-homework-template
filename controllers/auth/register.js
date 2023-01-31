
const { Conflict } = require("http-errors");
const { User } = require("../../models");

const register = async (req, res) => {
  const { name, password, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email ${email} in use`);
  }
  const newUser = await User.create({ name, password, email });
  // newUser.setPassword(password);
  // await newUser.save();
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        name: newUser.name,
        email: newUser.email,
        subscription: newUser.subscription,
      },
    },
  });
};
module.exports = register;
