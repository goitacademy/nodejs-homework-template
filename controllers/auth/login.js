const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User } = require("../../models");

const { HttpError } = require("../../utils");

const { SECRET_KEY } = process.env;

const login = async (request, response) => {
  const { email, password } = request.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const PasswordCompare = await bcrypt.compare(password, user.password);
  if (!PasswordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  response.json({
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
