const { User } = require("../models/user");
const bcrypt = require("bcryptjs");

const { HttpError, ctrlWrapper } = require("../helpers/index");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = "74392479832.4lj3re09.sf.ms";
  res.json({
    token,
  });
};
module.exports = {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
};
