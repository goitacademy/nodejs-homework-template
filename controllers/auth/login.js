const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");
const { SECRET_KEY, DB_HOST } = process.env;

const login = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized(`Email or password is wrong`);
  }
  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "30h" });
  res.json({ token });
};

module.exports = login;
