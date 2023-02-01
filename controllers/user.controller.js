const { BadRequest, NotFound, Conflict } = require('http-errors');
const path = require('path');
const fs = require('fs/promises');
var Jimp = require('jimp');

const { User } = require('../models/user');
const { sendMailNodemailer } = require('../helpers/index');
PORT = process.env.PORT || 3000;

async function createContact(req, res, next) {
  const { user } = req;
  const { id: contactId } = req.body;

  user.contacts.push({ _id: contactId });
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

async function sendRepeatVerifyEmail(req, res, next) {
  const { email } = req.body;
  if (!email) {
    throw BadRequest(`Missing required field email!`);
  }
  const storedUser = await User.findOne({ email });
  console.log('storedUser: ', storedUser);
  if (!storedUser) {
    throw Conflict('Email is not valid');
  }
  if (storedUser.verify) {
    throw BadRequest('Verification has already been passed!');
  }

  await sendMailNodemailer({
    to: email,
    subject: 'Please confirm your email!',
    html: `<a href="127.0.0.1:${PORT}/api/auth/verify/${storedUser.verificationToken}">Please, confirm your email!</a>`,
  });
  // or we can use sandgrid:
  // await sendMailSandgrid({
  //   to: email,
  //   subject: 'Please confirm your email!',
  //   html: `<a href="127.0.0.1:${PORT}/api/auth/verify/${storedUser.verificationToken}">Please, confirm your email!</a>`,
  // });

  return res.status(200).json({
    message: 'Sent repeat verification mail! Please, check your mail box!',
  });
}

async function updateStatusUser(req, res, next) {
  const { user } = req;
  const { email, _id: id, subscription, avatarURL } = user;
  if (!req.body) {
    throw BadRequest(`Missing field subscription!`);
  }
  const result = await User.findByIdAndUpdate(user._id, req.body, {
    new: true,
  });
  if (!result) {
    throw NotFound(`User with <${user.email}> not found!`);
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
}

module.exports = {
  createContact,
  getContacts,
  current,
  sendRepeatVerifyEmail,
  updateStatusUser,
  uploadAvatarUser,
};
