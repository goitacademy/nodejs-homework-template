const { User } = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const { HttpError, ctrlWrapper } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const subscription = user.subscription;

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email,
      subscription,
    },
  });
};

module.exports = {
  login: ctrlWrapper(login),
};
