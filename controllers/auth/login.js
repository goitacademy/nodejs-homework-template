const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError({ status: 401 });
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw RequestError({ status: 401 });
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });
  res.json({
    token,
  });
};

module.exports = login;
