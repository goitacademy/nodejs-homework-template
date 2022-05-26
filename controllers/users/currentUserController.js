const { User } = require('../../models/user');
const fs = require('fs/promises');
const path = require('path');
const sendEmail = require('../../helpers/sendEmail');
const { v4: uuidv4 } = require('uuid');

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

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    const error = new Error(`Not found`);
    error.status = 404;
    throw error;
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({
    message: 'Verify success',
  });
};

const reverifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error(`Not found`);
    error.status = 404;
    throw error;
  }

  if (!user.verify) {
    const verificationToken = uuidv4();
    await User.findByIdAndUpdate(user._id, {
      verificationToken,
    });

    const mail = {
      to: email,
      subject: 'Подтверждения email',
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить email</a>`,
    };

    await sendEmail(mail);

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    return res.json({
      message: 'Verify success',
    });
  }
  res.json({ message: 'Verification has already been passed' });
};

module.exports = {
  getCurrent,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  reverifyEmail,
};
