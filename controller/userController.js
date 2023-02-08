const gravatar = require("gravatar");
const User = require("../models/user.model");
const { hashPassword, comparePassword } = require("../utils/hash.util");
const { jwtSign } = require("../utils/jwt.util");
const { v4: uuidv4 } = require("uuid");
const { sendVerifyEmail } = require("../utils/verify.util");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const signUp = async ({ email, password }) => {
  const user = await User.findOne({ email: email });
  if (user) {
    return null;
  }
  const newUser = await User.create({
    email,
    password: hashPassword(password),
  });
  const secureUrl = gravatar.url(email, { s: "100", r: "x", d: "retro" }, true);
  const verificationToken = uuidv4();

  const updatedUser = await User.findOneAndUpdate(
    { _id: newUser._id },
    {
      token: jwtSign({ _id: newUser._id }),
      avatarURL: secureUrl,
      // verificationToken,
    },
    { new: true }
  );
  // sendVerifyEmail(verificationToken, email);
  const msg = {
    to: email, // Change to your recipient
    from: "uu.sokil@gmail.com", // Change to your verified sender
    subject: "Sign up", // Change to your
    text: "Congratulations! You have successfully signed up",
    html: `<a href="http://localhost:3000/api/users/verify/${newUser._id}">Please, verify your email!</a>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
  return updatedUser;
};

const signIn = async ({ email, password }) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    return null;
  }
  const isPasswordValid = comparePassword(password, user.password);
  if (!isPasswordValid) {
    return null;
  }
  return user;
};

const logout = async (_id) => {
  const user = await User.findOneAndUpdate(
    { _id },
    {
      token: null,
    },
    { new: true }
  );
  console.log("🚀 ~ file: userController.js:47 ~ logout ~ user", user);

  return user;
};

const updateSubscription = async (_id, subscription) => {
  const user = await User.findByIdAndUpdate(
    { _id },
    { subscription },
    { new: true }
  );
  return user;
};

const updateAvatar = async (_id, avatarURL) => {
  const user = await User.findByIdAndUpdate(
    { _id },
    { avatarURL },
    { new: true }
  );
  return user;
};

const verifyUser = async ({ _id }) => {
  const user = await User.findByIdAndUpdate(
    { _id },
    {
      verify: true,
      verificationToken: null,
    },
    { new: true }
  );
  console.log("🚀 ~ file: userController.js:99 ~ verifyUser ~ user", user);
  return user;
};

module.exports = {
  signUp,
  signIn,
  logout,
  updateSubscription,
  updateAvatar,
  verifyUser,
};
