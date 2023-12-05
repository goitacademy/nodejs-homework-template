const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/users");
const { ctrlWrapper } = require("../../helpers");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).exec();
  if (user === null) {
    return res.status(401).send({ massage: "Email or password is wrong" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch === false) {
    return res.status(401).send({ massage: "Email or password is wrong" });
  }

  if (user.verify === false) {
    return res.status(401).send({ massage: "Please verify your account" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  await User.findByIdAndUpdate(user._id, { token }).exec();
  res
    .status(200)
    .send({ token: token, user: { email: email, subscription: "starter" } });
};
module.exports = {
  login: ctrlWrapper(login),
};
