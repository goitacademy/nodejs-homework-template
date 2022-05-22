const User = require("../service/schemas/User");
const jwt = require("jsonwebtoken");

const signUser = async ({ res, value }) => {
  const user = await User.findOne({
    email: value.email,
  });

  if (user) {
    return res.status(409).json({ message: "Email in use" });
  }
  const newUser = new User({
    email: value.email,
    subscription: value.subscription,
  });

  await newUser.setPassword(value.password);
  await newUser.save();

  return newUser;
};

const loginUser = async ({ value, res }) => {
  const user = await User.findOne({ email: value.email });
  const isPasswordCorrect = await user.validatePassword(value.password);
  if (!user || !isPasswordCorrect) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  const payload = {
    id: user._id,
    email: user.email,
    subscription: user.subscription,
  };


  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "12h" });

  return { token: token, user: { email: user.email, subscription: user.subscription} };

};

module.exports = {
  signUser,
  loginUser,
};
