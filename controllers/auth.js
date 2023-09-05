const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const gravatar = require("gravatar");

const path = require("path");

const fs = require("fs/promises");

const Jimp = require("jimp");

const { nanoid } = require('nanoid');

require("dotenv").config();

const { User } = require("../models/user");

const { SECRET_KEY, BASE_URL } = process.env;

const { ctrlWrapper, ResponseError, sendEmail } = require("../helpers");

const avatarsDir = path.join(__dirname, "../", "public", "avatars")

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw ResponseError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationCode = nanoid();

  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationCode });

  const verifyEmail = {
    to: email, subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click to verify email</a>`,
 

  }

  await sendEmail(verifyEmail)

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const verifyEmail = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });
  if (!user) {
    throw ResponseError (404, 'User not found');
  }
  await User.findByIdAndUpdate(user._id, { verify: true, verificationCode: null });
  res.status(200).json({ message: 'Verification successful' });


}

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
   const user = await User.findOne({ email });
  if (!user) {
    throw ResponseError(404, 'User not found');
  }
  if (user.verify) {
    throw ResponseError(400, 'Verification has already been passed');
  }

  const verifyEmail = {
    to: email, subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Click to verify email</a>`,
 

  }

  
  await sendEmail(verifyEmail)

   res.status(200).json({ message: 'Verify email send success' });






}


const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw ResponseError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw ResponseError(401, 'Email is not verified');
  }



  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw ResponseError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    email,
    subscription,

  })

}


const logout = async (req, res) => {
  const {_id } = req.user;
  await User.findByIdAndUpdate( _id, {token: "" })
  const result = await User.findByIdAndUpdate(_id, { token: '' });
 if (!result) {
    throw ResponseError(404, 'Not found');
  }
  res.status(204).json({});
};
  
const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpUpload, originalname } = req.file;
  const jimpResize = await Jimp.read(tmpUpload)
  await jimpResize
    .resize(250, 250)
    .writeAsync(tmpUpload);
    
  
  const filename = `${_id}_${originalname}`
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tmpUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  })
};



module.exports = {
  register: ctrlWrapper(register),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
  
};
