const User = require('./schemas/user');
const fs = require('fs/promises');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const findById = async id => {
  return await User.findOne({ _id: id });
};

const findByEmail = async email => {
  return await User.findOne({ email });
};

const createUser = async options => {
  const user = new User(options);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const findByToken = async token => {
  return await User.findOne({ token });
};

const uploadCloud = pathFile => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      pathFile,
      {
        folder: 'Avatars',
        transformation: {
          width: 250,
          crop: 'fill',
        },
      },
      (error, result) => {
        console.log(result);
        if (error) reject(error);
        if (result) resolve(result);
      },
    );
  });
};

const getAvatar = async id => {
  const { avatar, idCloudAvatar } = await User.findOne({ _id: id });
  return { avatar, idCloudAvatar };
};

const updateAvatar = async (id, pathFile, next) => {
  try {
    const { secure_url: avatar, public_id: idCloudAvatar } = await uploadCloud(
      pathFile,
    );
    const oldAvatar = await getAvatar(id);
    cloudinary.uploader.destroy(oldAvatar.idCloudAvatar, (err, result) => {
      console.log(err, result);
    });
    await User.updateOne({ _id: id }, { avatar, idCloudAvatar });
    await fs.unlink(pathFile);
    return avatar;
  } catch (err) {
    next(err);
  }
};

module.exports = {
  findById,
  findByEmail,
  createUser,
  updateToken,
  findByToken,
  updateAvatar,
};
