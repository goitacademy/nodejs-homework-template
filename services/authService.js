const { v4: uuid4 } = require("uuid");
const { sendVerificationEmail } = require("./emailService");
const User = require("./schemas/userSchema");
const jwt = require("jsonwebtoken");

const registerUser = async ({ username, email, password, avatarURL }) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("This email is already taken!");
  }

  const verificationToken = uuid4();
  const newUser = new User({ username, email, avatarURL, verificationToken });
  await newUser.setPassword(password);
  await newUser.save();

  await sendVerificationEmail(email, verificationToken);
  return newUser;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not exists!");
  }

  if (!user.verify) {
    throw new Error("Email has not been verified! Please check your inbox.");
  }

  const isPasswordCorrect = await user.validatePassword(password);
  if (!isPasswordCorrect) {
    throw new Error("Wrong password!");
  }

  const payload = {
    id: user._id,
    username: user.username,
  };

  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "12h" });
  user.token = token;
  await user.save();
  return { token, user: { email: user.email, subscriptin: user.subscription } };
};

const logoutUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("Not authorized");
  }

  user.token = null;
  await user.save();
};

const verifyUser = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });
  if (!user) {
    return null;
  }

  user.verify = true;
  user.verificationToken = null;
  await user.save();

  return user;
};

const resendVerificationEmail = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.verify) {
    return "alreadyVerified";
  }

  await sendVerificationEmail(user.email, user.verificationToken);

  return "resent";
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  verifyUser,
  resendVerificationEmail,
};
