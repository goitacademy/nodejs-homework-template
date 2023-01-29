const { BadRequest, NotFound } = require('http-errors');
const { User } = require('../models/user');
const path = require('path');
const fs = require('fs/promises');

PORT = process.env.PORT || 3000;

var Jimp = require('jimp');

// Jimp.read('lenna.png', (err, lenna) => {
//   if (err) throw err;
//   lenna
//     .resize(256, 256) // resize
//     .quality(60) // set JPEG quality
//     .greyscale() // set greyscale
//     .write('lena-small-bw.jpg'); // save
// });

async function createContact(req, res, next) {
  const { user } = req;
  const { id: contactId } = req.body;

  user.contacts.push({ _id: contactId });
  // const updatedUser = await User.findByIdAndUpdate(user._id, user, {
  //   new: true,
  //   fields: {
  //     contacts: 1,
  //     _id: 0,
  //   },
  // });
  const updatedUser = await User.findByIdAndUpdate(user._id, user, {
    new: true,
  }).select({ contacts: 1, _id: 0 });

  console.log('updatedUser: ', updatedUser);

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
    _id: 1,
  });

  return res.status(200).json({
    data: {
      contacts: userWithContacts.contacts,
    },
  });
}

async function current(req, res, next) {
  const { user } = req;
  const { email, _id: id } = user;

  return res.status(200).json({
    data: {
      user: {
        email,
        id,
      },
    },
  });
}

async function updateStatusUser(req, res, next) {
  const { user } = req;
  const { email, _id: id, subscription, avatarURL } = user;
  if (!req.body) {
    throw BadRequest(`Missing field subscription`);
  }
  const result = await User.findByIdAndUpdate(user._id, req.body, {
    new: true,
  });
  if (!result) {
    throw NotFound(`User with <${user.email}> not found`);
  }
  return res.status(200).json({
    data: {
      user: {
        email,
        id,
        subscription,
        avatarURL,
      },
    },
  });
}

// add user avatar
async function uploadAvatarUser(req, res, next) {
  const { user } = req;
  const { email, _id: id, subscription } = user;
  const { filename } = req.file;
  console.log('req.file ', req.file);
  const tmpPath = path.resolve(__dirname, '../tmp', filename);
  const publicPath = path.resolve(__dirname, '../public/avatars', filename);
  if (!req.body) {
    throw BadRequest(`Missing field with avatar file`);
  }

  try {
    // Example Jimp
    // Jimp.read(tmpPath, (err, lenna) => {
    //   console.log('Jimp in progress...');
    //   if (err) throw err;
    //   lenna
    //     .resize(250, 250) // resize
    //     // .quality(60) // set JPEG quality
    //     // .greyscale() // set greyscale
    //     .write('filename'); // save
    // });

    // add Jimp
    const avatar = await Jimp.read(tmpPath);
    avatar.resize(250, 250); // resize
    avatar.write(tmpPath); // save

    await fs.rename(tmpPath, publicPath);
  } catch (error) {
    await fs.unlink(tmpPath);
    throw error;
  }

  const result = await User.findById(user._id);
  if (!result) {
    throw NotFound(`User with <${user.email}> not found`);
  }
  result.avatarURL = `http://127.0.0.1:${PORT}/public/avatars/${filename}`;
  await result.save();
  return res.status(200).json({
    data: {
      user: {
        email,
        id,
        subscription,
        avatarURL: result.avatarURL,
      },
    },
  });

  // req.file
  // console.log('req.file ', req.file);
  // const { filename } = req.file;
  // const tmpPath = path.resolve(__dirname, '../tmp', filename);
  // const publicPath = path.resolve(__dirname, '../public/avatars', filename);

  // try {
  //   await fs.rename(tmpPath, publicPath);
  // } catch (error) {
  //   await fs.unlink(tmpPath);
  //   throw error;
  // }

  // const userId = req.params.id;

  // const user = await User.findById(userId);
  // user.avatarURL = `http/127.0.0.1/public/avatars/${filename}`;
  // await user.save();

  // return res.json({ data: { avatarURL: user.avatarURL } });
}

module.exports = {
  createContact,
  getContacts,
  current,
  updateStatusUser,
  uploadAvatarUser,
};
