const { Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passCompare = bcrypt.compareSync(password, user.password);
  if (!user || !passCompare) {
    throw new Unauthorized(`Email or password is wrong`);
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "3d" });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(201).json({ Status: "201 success", result: { token } });
};
module.exports = login;
