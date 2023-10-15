const { User } = require("../models/user");
const HttpError = require("../helpers/HttpError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const {nanoid} = require("nanoid");
const sendEmail = require("../helpers/sendMail")


const {SECRET_KEY, BASE_URL} = process.env;

const avatarsDir  =path.join(__dirname, "../", "public", "avatars");
const tmpDir = path.join(__dirname, "../", "tmp");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationCode = nanoid();

  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationCode });
  const verifyEmail = {
    to:email,
    subject:"Verify email",
    html:`<a target= "_blank" href="${BASE_URL}/api/auth/users/verify/${verificationCode}"> Click verify email</a>`
  }
  await sendEmail(verifyEmail);

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

const verifyEmail = async(req, res)=>{
const {verificationCode} = req.params;
const user = await User.findOne({verificationCode});
if(!user){
  throw HttpError(404, "User not found")
}

await User.findByIdAndUpdate(user._id, {verify:true, verificationCode:""});

res.json({
  message: "Verification successful"
})
}

const resendVerifyEmail = async(req,res) =>{
  const {email} = req.body;
  const user = await User.findOne({email});
  if(!user){
    throw HttpError(400, "missing required field email")
  }
  if(user.verify){
    throw HttpError(400, "Verification has already been passed")
  }

  const verifyEmail = {
    to:email,
    subject:"Verify email",
    html:`<a target= "_blank" href="${BASE_URL}/api/auth/users/verify/${user.verificationCode}"> Click verify email</a>`
  }
  await sendEmail(verifyEmail);
  res.json({
    message: "Verification email sent"
  })
}

const login = async (req, res) =>{
    const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  if(!user.verify){
    throw HttpError(401, "Email not verified");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if(!passwordCompare){
    throw HttpError(401, "Email or password is wrong");
  }
  
  const payload = { 
    id:user._id,
  }

  const token = jwt.sign(payload, SECRET_KEY, {expiresIn:"23h"});
 await User.findByIdAndUpdate(user._id, {token});
  res.json({
    token,
  })
}


const getCurrent = async (req, res) =>{
const {email, subscription} = req.user;
res.json({
  email,
  subscription
})
}

const logout = async(req, res)=>{
const {_id} = req.user;
await User.findByIdAndUpdate(_id, {token:""})

res.json({
  message:"Logout success"
})
}


const processAvatar = async (inputPath, outputPath) => {
  try {
    const image = await Jimp.read(inputPath);
    await image.resize(250, 250); 
    await image.write(outputPath); 
    console.log("The avatar has been successfully processed and resized.");
  } catch (error) {
    console.error("Error processing avatar:", error);
  }
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const tmpPath = path.join(avatarsDir, filename);
  const resultUpload = path.join(tmpDir, filename);
  const avatarFileName = `avatars/${filename}`;

  await processAvatar(tempUpload, tmpPath);

  try {

    await fs.rename(tempUpload, resultUpload);


    await User.findByIdAndUpdate(_id, { avatarURL: avatarFileName });

    res.json({
      avatarURL: avatarFileName,
    });
  } catch (error) {
    throw HttpError(500, "Avatar upload failed");
    
  }
};





module.exports = {
  register: ctrlWrapper(register),
  verifyEmail:ctrlWrapper(verifyEmail),
  resendVerifyEmail:ctrlWrapper(resendVerifyEmail),
  login:ctrlWrapper(login),
  getCurrent:ctrlWrapper(getCurrent),
  logout:ctrlWrapper(logout),
  updateAvatar:ctrlWrapper(updateAvatar),
 

};
