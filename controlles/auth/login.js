const { HttpError, ctrlWrapper } = require("../../helpers");
const { User } = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const { JWT_SECRET } = process.env;

const login = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email is wrong");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw HttpError(401, "Password is wrong");
  }

  const payload = { id: user._id };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "12h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    id: user._id,
    token: token,
    user: {
      email: user.email,
      subscription: "starter",
    },
  });
};

module.exports = ctrlWrapper(login);
