// const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const { RequestError } = require("../../utils");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, "Email or password is wrong");
  }
  //   const comparePassword = await bcrypt.compare(password, user.password);
  const comparePassword = await user.validatePassword(password);
  if (!comparePassword) {
    throw new RequestError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  console.log(token);
  await User.findOneAndUpdate(user._id, { token });
  res.json({
    token,
  });
};

module.exports = login;
