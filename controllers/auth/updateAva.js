const path = require('path');
const fs = require('fs').promises;
const { User } = require('../../models/user');
const { resize } = require('../../helpers');
const cloudinary = require('cloudinary').v2;

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const updateAva = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  await resize(tempUpload);
  const filename = `${req.user._id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join(avatarsDir, filename);
  console.log(avatarURL);
  try {
    const { url: avatarUrl } = await cloudinary.uploader.upload(avatarURL);
    await User.findByIdAndUpdate(req.user._id, { avatarUrl });
    res.json({ avatarUrl });
    // console.log(result);
  } catch (error) {
    console.log(error);
  }

  // console.log(result);
  // const { path: tempUpload, originalname } = req.file;
  // await resize(tempUpload);
  // const filename = `${req.user._id}_${originalname}`;
  // const resultUpload = path.join(avatarsDir, filename);
  // await fs.rename(tempUpload, resultUpload);
  // const avatarURL = path.join('avatars', filename);
  // await User.findByIdAndUpdate(req.user._id, { avatarURL });
  // res.json({ avatarURL });
};

module.exports = updateAva;
