const User = require("../../models/users");
const RequestError = require("../../helpers/RequestError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(401, "There are not any user with email: " + email);
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw RequestError(401, "Password is wrong");
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(201).json({
    token,
    message: "Success!",
    user: {
      subscription: user.subscription,
      email: user.email,
    },
  });
};

module.exports = login;
