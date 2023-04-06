const { User } = require("./auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getConfig } = require("../../config");
const { Conflict, Unauthorized } = require("http-errors");
const fs = require("fs/promises")
const path = require("path");
const gravatar = require("gravatar");

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(5);
  return bcrypt.hash(password, salt);
};

const generateToken = (userId) => {
  const { jwt: jwtConfig } = getConfig();
  return jwt.sign({ userId }, jwtConfig.secret, { expiresIn: "1h" });
};

const singUp = async (userParams) => {
  const { email, password, subscription } = await userParams;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Conflict(`User with ${email} already exists`);
  }

 const avatarURL = gravatar.url(email);

 console.log(avatarURL);
  return User.create({
    email,
    subscription,
    passwordHash: await hashPassword(password),
    avatarURL,
  });
};

const singIn = async (singIpParams) => {
  const { email, password } = await singIpParams;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized(`Email or password is wrong`);
  }
  const userPassword = bcrypt.compareSync(password, user.passwordHash);
  if (!userPassword) {
    throw new Unauthorized(`Email or password is wrong`);
  }
  const token = generateToken(user._id);

  await User.findByIdAndUpdate(user, { token });
  return { user, token };
};

const deleteToken = (req) => {
  const { _id } = req.userId;
  User.findByIdAndUpdate(_id, { token: null });
};

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const createAvatar = async (req) => {
   const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;

  try {
    const resultPath = path.join(avatarsDir, `${id}_${originalname}`);
    await fs.rename(tempUpload, resultPath);
    const avatarURL = path.join("public", "avatars", `${id}_${originalname}`);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
   
    return avatarURL;
  } catch (error) {
    await fs.unlink(tempUpload)
    throw error;
  }
};

module.exports = { singUp, singIn, deleteToken, createAvatar };
