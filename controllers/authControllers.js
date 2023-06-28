const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const {nanoid} = require("nanoid");

const User = require("../models/UserModel");
const { ctrlWrapper } = require("../decorators");
const { HttpError, sendEmail } = require("../helpers");
const { saveUserAvatar } = require("../helpers/avatarHelpers");

const { SECRET_KEY, BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();

  const avatarURL = gravatar.url(email, { s: "250", d: "retro" });

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`
}

await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

const verify = async(req, res) => {
  const {verificationToken} = req.params;
  const user = await User.findOne({verificationToken});
  if(!user) {
      throw HttpError(401)
  }
  await User.findByIdAndUpdate(user._id, {verify: true, verificationToken: null});

  res.json({
      message: "Email verify success"
  })
};

const resendVerifyEmail = async(req, res)=> {
  const {email} = req.body;
  const user = await User.findOne({email});
  if(!user) {
      throw HttpError(401)
  }

  const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click verify email</a>`
  }

  await sendEmail(verifyEmail);

  res.json({
      message: "Email success"
  })
}

const login = async (req, res) => {
  const { email: userEmail, password } = req.body;
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    throw HttpError(400, "Email or password is wrong");
  }
  if(!user.verify) {
    throw HttpError(401, "Email not register")
}

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(400, "Email or password is wrong");
  }

  const { _id: id, email, subscription } = user;
  const payload = { id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });
  res.json({ token, user: { email, subscription } });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({
    message: "No Content",
  });
};

const current = (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const subscription = async (req, res) => {
  const { _id, subscription: currentSubscription } = req.user;
  const { newSubscription } = req.body;

  if (currentSubscription !== newSubscription) {
    const validSubscriptions = ["starter", "pro", "business"];
    if (validSubscriptions.includes(newSubscription)) {
      await User.findByIdAndUpdate(_id, { subscription: newSubscription });
      res.json({ newSubscription });
    } else {
      throw HttpError(
        400,
        "Invalid subscription value. Valid options are 'starter', 'pro', or 'business'"
      );
    }
  } else {
    throw HttpError(400, "This subscription is already in use");
  }
};

const updateAvatar = async (req, res) => {
  const avatarURL = await saveUserAvatar(req, res);
  await req.user.updateOne({ avatarURL });

  res.json({ avatarURL });
};

module.exports = {
  register: ctrlWrapper(register),
  verify: ctrlWrapper(verify),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  subscription: ctrlWrapper(subscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
