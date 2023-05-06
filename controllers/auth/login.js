const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const { SECRET_KEY } = process.env;

const login = async (requirement, response) => {
  const { email, password } = requirement.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "User is not found. Please check email");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw HttpError(401, "Password is incorrect. Please check");
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "100d" });
  await User.findByIdAndUpdate(user._id, { token });

  return response.json({ token });
};

module.exports = login;
