const { User } = require("../../models/user");
const { Conflict } = require("http-errors");

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`${email} in use`);
  }
  const newUser = new User({ email });
  newUser.setPassword(password);
  newUser.save();
  res.status(201).json({
    user: {
      email,
      subscription: "starter",
    },
  });
};

module.exports = signUp;
