const { User } = require('../../models/user');
const fs = require('fs/promises');
const path = require('path');

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true },
  );
  res.json({
    email: updatedUser.email,
    subscription: updatedUser.subscription,
  });
};

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');
const Jimp = require('jimp');

const updateAvatar = async (req, res) => {
  console.log(req.file.path);
  console.log(req.file.originalname);

  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;
  try {
    const resultUpload = path.join(avatarsDir, imageName);
    await fs.rename(tempUpload, resultUpload);
    Jimp.read(resultUpload).then(image => {
      image.resize(250, 250).write(resultUpload);
    });
    const avatarURL = path.join('public', 'avatars', imageName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = { getCurrent, updateSubscription, updateAvatar };
