const { User } = require("../models");
const { HttpError } = require("../addoption/");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../services");
const path = require("path");
const fse = require("fs-extra");
const jimp = require("jimp");

const uuid = require("uuid").v4;

exports.checkUserEmailExists = async (email) => {
  const emailExists = await User.exists(email);

  if (emailExists) throw HttpError(409, "Email in use");
};

exports.registerUser = async (data) => {
  const verificationToken = uuid();

  const newUserData = {
    ...data,
    verificationToken,
    verify: false,
  };
  const newUser = await User.create(newUserData);

  const verifyEmail = {
    to: data.email,
    subject: "Verify your email",
    html: `<a target="_blank" href="/api/users/verify/${verificationToken}">Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  newUser.password = undefined;

  return {
    user: newUser,
  };
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) throw HttpError(401, "Email or password is wrong");

  if (!user.verify) {
    throw HttpError(403, "Email is not verified");
  }

  const passwdIsValid = await user.checkPassword(password, user.password);

  if (!passwdIsValid) throw HttpError(401, "Email or password is wrong");

  user.password = undefined;

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  await User.findByIdAndUpdate(user.id, { token });

  return {
    token,
    user: { email: user.email, subscription: user.subscription },
  };
};

exports.avatars = async (userData, user, file, res) => {
  console.log(file);

  if (file) {
    console.log(1);
    const { _id } = user;
    const tmpPath = path.join(__dirname, "../tmp");
    const fileName = `${_id}-${file.originalname}`;
    const filePath = path.join(tmpPath, fileName);

    await fse.rename(tmpPath, filePath);

    const image = await jimp.read(filePath);
    await image.resize(250, 250).write(filePath);

    const avatarsPath = path.join(__dirname, "../public/avatars");
    const avatarURL = `/avatars/${fileName}`;
    const destinationPath = path.join(avatarsPath, fileName);

    await fse.move(filePath, destinationPath);

    user.avatarURL = avatarURL;
  }

  Object.keys(userData).forEach((key) => {
    user[key] = userData[key];
  });

  return user.save();
};

exports.verifyEmail = async ({ verificationToken }) => {
  const user = await User.findOne({ verificationToken }).select("+password");

  if (!user) throw HttpError(404, "User not found");

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  return {
    message: "Verification successful",
  };
};

exports.forwardVerification = async ({ email }) => {
  const user = await User.findOne({ email });

  if (!user) throw HttpError(404, "User not found");

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify your email",
    html: `<a target="_blank" href="/api/users/verify/${user.verificationToken}">Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  return {
    message: "Verification email sent one more time",
  };
};
