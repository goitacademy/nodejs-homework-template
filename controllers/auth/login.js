const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(409, `Email ${email} not found`);
  }
  const passCompare = bcrypt.compare(
    password,
    user.password
  );
  if (!passCompare) {
    throw HttpError(401, `Password wrong`);
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "1h",
  });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
  });
};
module.exports = login;
