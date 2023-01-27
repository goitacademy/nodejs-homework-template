const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");
const { ctrlWrapper, HttpError, sendEmail } = require("../helpers");
require("dotenv").config();

const { SECRET_KEY, BASE_URL } = process.env.SECRET_KEY;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(409);
    throw HttpError(409, "Email in use");
  }

  const verificationToken = nanoid();
  const varifyEmail = {
    to: email,
    subject: "Contacts App. Verify email",
    html: `<a targt="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Verify email. </a><p>Please, click below</p>`,
  };
  await sendEmail(varifyEmail)


  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword, verificationToken });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const verify = async (req, res) => {
  const { verificationToken } = req.params
  const user = await User.findOne({ verificationToken })
  
  if (!user) {
    throw HttpError(404)
  }

  await User.findByIdAndUpdate(user._id, {verify: true, verificationToken: ""})

  res.status(200).json({
    message: "Verification successful"
  })

}

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!user || !passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(401, "Email doesn't verifed");
  }

  const payload = {
    id: user._id,
    // name: user.name,
    // email: user.email,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
    token,
  });
};

const logout = async (req, res) => {
  const { _id: owner } = req.user;

  await User.findByIdAndUpdate({ _id: owner }, { token: "" });
  res.status(204);
};

const current = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    email,
    subscription,
  });
};

const updateSubscriptionType = async (req, res) => {
  const { _id: owner } = req.user;
  const { email, subscription } = req.body;

  if (
    subscription === "starter" ||
    subscription === "pro" ||
    subscription === "business"
  ) {
    await User.findByIdAndUpdate({ _id: owner }, { subscription });
    res.status(200).json({
      email,
      subscription,
    });
  }

  throw HttpError(400);
};

module.exports = {
  register: ctrlWrapper(register),
  verify: ctrlWrapper(verify),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  updateSubscriptionType: ctrlWrapper(updateSubscriptionType),
};
