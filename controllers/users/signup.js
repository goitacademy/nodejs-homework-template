const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const signup = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  //   const hashPassword = await bcrypt.hash(password, 10);

  //   const newUser = await User.create({ ...req.body, password: hashPassword });
  //   const newUser = await User.create({ ...req.body, password: hashPassword });
  const newUser = await User.create(req.body);

  res.status(201).json({
    email: newUser.email,
    subscription: "starter",
  });
};

module.exports = signup;
