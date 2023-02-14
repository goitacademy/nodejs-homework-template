const { User } = require('../mod/user');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require("jimp");

async function createContact(req, res, next) {
  const { user } = req;
  const { id: contactId } = req.body;

  user.contacts.push({ _id: contactId });
  // Variant-1
  // const updatedUser = await User.findByIdAndUpdate(user._id, user, {new: true, fields: {contacts: 1}});
  // Variant-2
  const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true }).select({ contacts: 1, _id: 0 });

  console.log('updatedContact:', updatedUser);

  return res.status(201).json({
    data: {
      contacts: updatedUser.contacts,
    },
  });
}

async function getContacts(req, res, next) {
  const { user } = req;
  const userWithContacts = await User.findById(user._id).populate('contacts', {
    name: 1,
    email: 1,
    phone: 1,
    favorite: 1,
    _id: 1,
  });

  return res.status(200).json({
    data: {
      contacts: userWithContacts.contacts,
    },
  });
}

async function getCurrentUser(req, res, next) {
  const { user } = req;
  const { email, _id: id, subscription } = user;

  return res.status(200).json({
    date: {
      user: {
        email,
        id,
        subscription,
      },
    },
  });
}


async function updateAvatar(req, res, next) {
  const { id } = req.user;
  const { filename } = req.file;
  const tmpPath = path.resolve(__dirname, "../tpm", filename);
  const publicPath = path.resolve(__dirname, "../public/avatars", filename);

  await Jimp.read(tmpPath).then((image) => {
    return image.resize(250, 250).write(tmpPath);
  }).catch((error) => {
    console.error(error);
  });

  try {
    await fs.rename(tmpPath, publicPath);
  } catch (error) {
    await fs.unlink(tmpPath);
    return error;
  };

  const upUser = await User.findByIdAndUpdate(
    id,
    {
      avatarURL: `/public/avatars/${filename}`,
    },
    {
      new: true,
    }
  );
  console.log("upUser", upUser);


  }
module.exports = {
  createContact,
  getContacts,
  getCurrentUser,
  updateAvatar,
}

