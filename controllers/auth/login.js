const { User } = require("../../models/user");
const { HttpError } = require("../../utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

const { SECRET_KEY } = process.env;

// console.log(SECRET_KEY);

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is invalid");
  }

  const passwordComparre = await bcrypt.compare(password, user.password);

  if (!passwordComparre) {
    throw HttpError(401, "Email or password is invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "30d" });

  res.json({
    token,
  });
};

module.exports = login;
