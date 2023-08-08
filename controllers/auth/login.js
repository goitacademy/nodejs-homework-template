const User = require("../../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { HttpError } = require("../../helpers");

require("dotenv").config();
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const comparePass = await bcrypt.compare(password, user.password);
  if (!comparePass) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "20h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email: user.email,
      avatarUrl: user.avatarUrl,
      avatarPublickId: user.avatarPublickId,
      avatarLink: user.avatarLink,
      subscription: user.subscription,
    },
  });
};
module.exports = login;
