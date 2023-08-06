const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const { SEKRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });

  if (!findUser) {
    throw HttpError(401, "Email or password invalid");
  }

  const comparePassword = await bcrypt.compare(password, findUser.password);

  if (!comparePassword) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: findUser._id,
  };

  const token = jwt.sign(payload, SEKRET_KEY, { expiresIn: "24h" });
  const { _id } = findUser;
  await User.findByIdAndUpdate(_id, { token });

  res.json({ token });
};

module.exports = login;
