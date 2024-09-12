const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs/promises");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");

require("dotenv").config();
const { SECRET_KEY, BASE_URL } = process.env;

const { User } = require("../models/user");
const { HttpError, sendVerificationEmail } = require("../utils");

const verificationToken = nanoid();

const avatarsDir = path.join(process.cwd(), "./", "public", "avatars");

const register = async (data) => {
  const { email, password } = data.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { d: "wavatar" }, true);

  const newUser = await User.create({
    ...data.body,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });

  sendVerificationEmail({
    to: email,
    subject: "Verification email",
    html: `<p><strong>Hello, this is your verification message, click <a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Here</a> to verify and continue</strong></p>`,
  });

  return newUser;
};

const verifyEmail = async(data) => {
  const {verificationToken} = data.params;
  const user = await User.findOne({verificationToken});

  if(!user) {
    throw HttpError(404, "User not found")
  }
  console.log(user.email)

  await User.findByIdAndUpdate(user._id, {verify: true, verificationToken: null})

};

const resendVerificationEmail = async(data) => {
  const {email} = data.body;

  const user = await User.findOne({email});

  console.log("user:", user, "email: ", email)

  if(!user) {
    throw HttpError(400, "Missing required field email")
  }

  if(user.verify && !user.verificationToken) {
    throw HttpError(400, "Verification has already been passed");

  } else {
    sendVerificationEmail({
      to: email,
      subject: "Verification email",
      html: `<p><strong>Hello, this is your verification message, click <a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Here</a> to verify and continue</strong></p>`,
    });
  }

};

const login = async (data) => {
  const { email, password } = data.body;
  const user = await User.findOne({ email });

  const comparedPassword = await bcrypt.compare(password, user.password);

  if (!user || !comparedPassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  if(!user.verify) {
    throw HttpError(404, "User email not verified")
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
  await User.findByIdAndUpdate(user._id, { token });
  return token;
};

const logout = async (data) => {
  const { _id } = data.user;
  const result = await User.findByIdAndUpdate(_id, { token: null });

  return result;
};

const updateUserAvatar = async (data, _) => {
  const { _id } = data.user;
  const { path: tempDirUpload } = data.file;

  const imageName = `${_id}__avatar.jpg`;

  const finalDirUpload = path.join(avatarsDir, imageName);
  const avatarURL = path.join(avatarsDir, imageName);

  const userAvatar = await Jimp.read(tempDirUpload);
  await userAvatar.resize(250, 250).writeAsync(tempDirUpload);

  await fs.rename(tempDirUpload, finalDirUpload);

  await User.findByIdAndUpdate(_id, { avatarURL });
};

module.exports = {
  register,
  login,
  logout,
  updateUserAvatar,
  verifyEmail,
  resendVerificationEmail
};
