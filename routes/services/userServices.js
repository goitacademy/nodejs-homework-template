const { User } = require("../../db/userModel");
const { Conflict, Unauthorized, NotFound, BadRequest } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const fs = require("fs").promises;
const path = require("path");
const Jimp = require("jimp");
const { sendEmail } = require("../../sendGrid/sendEmail");
const { v4: uuidv4 } = require("uuid");

const registration = async (email, password) => {
  const userExist = await User.findOne({ email });
  const avatarURL = gravatar.url(email, { protocol: "https", s: "100" });
  if (userExist) {
    throw new Conflict(`User with email ${email} is already exist`);
  }
  const verifyToken = uuidv4(email);
  console.log(verifyToken);
  sendEmail(email, verifyToken);
  const user = new User({
    email,
    password,
    avatarURL,
    verifyToken,
    verify: false,
  });
  await user.save();
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound(`User with email ${email} not found`);
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new Unauthorized("Email or password is wrong, try again");
  }
  if (!user.verify) {
    throw new Unauthorized(
      "Email is not verificated, check your email and verify it"
    );
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );
  await User.findOneAndUpdate(email, { token });
  return token;
};

const addToken = async (email, token) => {
  const result = await User.findOneAndUpdate({ email }, { token });
  return result;
};

const getCurrent = async (_id) => {
  const user = await User.findById({ _id });
  return user;
};

const deleteUser = async (userId) => {
  const result = await User.findOneAndDelete({ _id: userId });
  if (!result) {
    throw new NotFound("User not found");
  }
  return result;
};

const logout = async (id) => {
  await User.findByIdAndUpdate(id, { token: null });
};

const updateSubscription = async (id, subscription) => {
  const result = await User.findByIdAndUpdate(id, { subscription });
  return result;
};

const updateAvatar = async (id, tempUpload, originalname) => {
  const newName = `${id}_${originalname}`;
  try {
    const resultUpload = path.join(
      __dirname,
      "../../",
      "public",
      "avatars",
      newName
    );
    const file = await Jimp.read(tempUpload);
    await file.resize(250, 250).write(tempUpload);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", newName);
    const result = await User.findByIdAndUpdate(id, { avatarURL });
    return result;
  } catch (error) {
    await fs.unlink(tempUpload);
    console.log(error.message);
  }
};
const verificationByToken = async (verifyToken) => {
  const user = await User.findOne({ verifyToken });
  if (!user) {
    throw new NotFound("User is verificated or does not exist");
  }
  const result = await User.findOneAndUpdate(
    { _id: user._id },
    { $set: { verify: true, verifyToken: null } }
  );
  return result;
};
const userSendEmailAgain = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound("User not found");
  }
  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }
  if (!user.verifyToken) {
    throw new BadRequest("Verification has already been passed");
  }
  await sendEmail(email, user.verifyToken);
};

module.exports = {
  registration,
  login,
  getCurrent,
  logout,
  addToken,
  deleteUser,
  updateSubscription,
  updateAvatar,
  verificationByToken,
  userSendEmailAgain,
};
