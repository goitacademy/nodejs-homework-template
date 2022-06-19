const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SEKRET_KEY } = process.env;

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passCompare = bcrypt.compareSync(password, user.password);
  if (!user || !passCompare) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SEKRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token }, { new: true });
  return res.status(201).json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

module.exports = {
  login,
};
