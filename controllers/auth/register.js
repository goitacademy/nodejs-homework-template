const { Conflict } = require("http-errors");
const { User } = require("../../models");

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }
  const newUser = new User({ email, password, subscription });
  newUser.setPassword(password);
  newUser.save();

  res.srarus(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        password,
        subscription,
      },
    },
  });
};

module.exports = register;
