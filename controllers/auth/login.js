const { User } = require("../../models/user");
const { HttpError } = require("../../utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(404, "User not found. Please confirm your email")
  }

  const passwordComparre = await bcrypt.compare(password, user.password);

  if (!passwordComparre) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "30d" });
  await User.findByIdAndUpdate(user._id, {token})

  res.json({
    email,
    subscription: user.subscription,
    token,
  });
};

module.exports = login;
