const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");
const { ctrlWrapper, HttpError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  const comparePassword = await bcrypt.compare(password, user.password);
  // беремо хешований пароль і введений користувачем при логінізації та перевіряємо
  if (!user || !comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  // npm i jsonwebtoken
  res.status(200).json({
    token,
  });
};

module.exports = {
  login: ctrlWrapper(login),
};
