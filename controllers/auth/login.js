const { RequestError } = require("../../helpers");
const bcript = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password} = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, "Email of password wrong");
  }

  const passwordCompare = await bcript.compare(password, user.password);
  if (!passwordCompare) {
    throw RequestError(401, "Email of password wrong");
  }
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({ token });
};
module.exports = login;
