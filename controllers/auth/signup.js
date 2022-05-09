const { Conflict } = require("http-errors");
const { User } = require("../../models/user");

const signup = async (req, res) => {
  const { password, email, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} is already exist`);
  }
  const newUser = new User({ email, subscription });
  newUser.setPassword(password);
  newUser.save();
  res.status(201).json({ email, subscription });
};

module.exports = signup;
