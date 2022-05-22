const { Users } = require("../db/usersModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const fs = require("fs").promises;

require("dotenv").config();

const signupUser = async (body) => {
  const { email, password, subscription } = body;

  const isSingup = await Users.create({
    email,
    password: await bcryptjs.hash(
      password,
      Number(process.env.BCRYPT_SALT_ROUNDS)
    ),
    subscription,
    avatarURL: gravatar.url(email, { s: "100", r: "x", d: "retro" }, false),
  });
  return isSingup;
};

const loginUser = async (body) => {
  const { email, password } = body;
  let user = await Users.findOne({ email });
  const isPasswordCorrect = await bcryptjs.compare(password, user.password);
  if (isPasswordCorrect) {
    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    user = await Users.findOneAndUpdate({ email }, { token }, { new: true });
    return user;
  }
};

const logoutUser = async (token) => {
  const user = await Users.findOneAndUpdate(
    { token },
    { token: null },
    { new: true }
  );
  return user;
};

const currentUser = async (token) => {
  const user = await Users.findOne(
    { token },
    { email: 1, subscription: 1, avatarURL: 1, _id: 0 }
  );
  return user;
};

const avatarsUpdate = async (token, body) => {
  const { path, filename } = body;
console.log('filename', filename)
 const newFile = await Jimp.read(path)
 const newPath = "./public/avatars/" + filename;
 await newFile.resize(250, 250).writeAsync(newPath);
 await fs.unlink(path);

 const user = await Users.findOneAndUpdate(
   { token },
   { avatarURL: newPath },
   { new: true }
 );
  return user;
};

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  currentUser,
  avatarsUpdate,
};
