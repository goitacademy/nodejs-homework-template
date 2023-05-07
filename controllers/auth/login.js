const User = require("../../models/userShema");
const { HttpError } = require("../../helpers/index");
const { addShemaAuth } = require("../../JoiShems/index");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const login = async (req, res) => {
  const { error } = addShemaAuth.validate(req.body);
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw HttpError(401, "Email or password is wrong");
  }
  if (error) {
    throw HttpError(400, "Помилка від Joi або іншої бібліотеки валідації");
  }

  const token = jwt.sign({ email, password }, JWT_SECRET);
  res.json({
    token: token,
    email: user.email,
    subscription: user.subscription,
  });
};

module.exports = login;
