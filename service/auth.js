const User = require("../service/schemas/User");
const jwt = require("jsonwebtoken");
var gravatar = require("gravatar");

const signUser = async ({ res, value }) => {
  const existingUser = await User.findOne({
    email: value.email,
  });

  if (existingUser) {
    return res.status(409).json({ message: "Email in use" });
  }
  const newUser = new User({
    email: value.email,
    subscription: value.subscription,
    avatarURL: gravatar.url(value.email),
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
    avatarURL: user.avatarURL,
  };

  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "12h" });

  const updatedUser = {
    id: user._id,
    email: user.email,
    subscription: user.subscription,
    avatarURL: user.avatarURL,
    token: token,
  };

  await User.findOneAndUpdate(
    {
      email: value.email,
    },
    { $set: updatedUser },
    {
      new: true,
      runValidators: true,
      strict: "throw",
    }
  );

  return {
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
      token: token,
    },
  };
};

module.exports = {
  signUser,
  loginUser,
};
