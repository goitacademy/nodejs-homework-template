const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

const { controllersWraper, HttpError, sendEmail } = require("../helpers");

const { SECRET_KEY, BASE_URL } = process.env;

const register = async (rec, res) => {
  const { email, password } = rec.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "this email already use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const verificationCode = uuid.v4();

  const newUser = await User.create({
    ...rec.body,
    password: hashPassword,
    verificationCode,
  });

  const verifyEmail = {
    to: email,
    subject: " Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}" >Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

const verifyEmail = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });
  if (!user) {
    throw HttpError(401, " email not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationCode: "",
  });

  res.json({
    message: "Email verify SUCCESS",
  });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, " Email not found");
  }
  if (user.verify) {
    throw HttpError(401, "this emeail already verified");
  }

  const verifyEmail = {
    to: email,
    subject: " Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}" >Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "verify email sent SUCCESS",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "emeail or password wrong or invalid");
  }

  if (!user.verify) {
    throw HttpError(404, "Email verification required");
  }

  const comparePassword = bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw HttpError(404, "emeail or password wrong or invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "20h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
  });
};

const getCurrent = async (req, res) => {
  const { email, name } = req.user;
  console.log(req.user);
  res.json({
    email,
    name,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json("logout success");
};

module.exports = {
  register: controllersWraper(register),
  verifyEmail: controllersWraper(verifyEmail),
  resendVerifyEmail: controllersWraper(resendVerifyEmail),
  login: controllersWraper(login),
  getCurrent: controllersWraper(getCurrent),
  logout: controllersWraper(logout),
};
