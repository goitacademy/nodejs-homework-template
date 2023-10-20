const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const uuid = require("uuid");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { User } = require("../models/user");
const { HttpError, ctrlWrapper, sendMail } = require("../helpers");
// const { verify } = require("crypto"); CONTROL!!!!!!!!!!!!!!!!!!!!!!!!!!!
const { SECRET_KEY } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");
const { transport } = sendMail;

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = uuid.v4();
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    from: 'nodemailjs@ukr.net',
    subject: "підтвердження поштової скриньки",    
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify your email</a>`,
  };

  // await transport
  //   .sendMail(mail)
  //   .then(() => console.log("email sent success"))
  //   .catch((err) => console.log(err.message));

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.verify) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
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

  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({
    message: "Logout successfull",
  });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  await Jimp.read(resultUpload)
    .then((avatar) => avatar.resize(250, 250).writeAsync(resultUpload))
    .catch((error) => {
      throw HttpError(404, error.message);
    });

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

const verify = async (req, res) => {
  const {verificationToken} = req.params;
  const user = await User.findOne({verificationToken});
  if(!user){
    throw HttpError(404)
  }
  await User.findByIdAndUpdate(user._id, {verify: true, verificationToken: ""});

  res.status(200).json({
    message: "Verification successful"
  })
}

const resendEmail = async (req, res) => {
  const {email} = req.body;
  const user = await User.findOne({email});
  if(!user || user.verify){
    throw HttpError(404)
  }
  const mail = {
    to: email,
    subject: "підтвердження поштової скриньки",    
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click to verify your email</a>`, 
  }
  // await transport
  //   .sendMail(mail)
  //   .then(() => console.log("email sent success"))
  //   .catch((err) => console.log(err.message)); 

}

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
  verify: ctrlWrapper(verify),
  resendEmail: ctrlWrapper(resendEmail),
};

// const createHashPassword = async (password) => {
//     const salt = bcrypt.genSalt(10);
//     console.log(salt);
//     const result = await bcrypt.hash(password, 10)
//     const compareResult = await bcrypt.compare(password, result);
// }
