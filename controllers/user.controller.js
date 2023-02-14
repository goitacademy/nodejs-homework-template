const { User } = require('../models/user');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
const { NotFound } = require('http-errors');
const { sendMail } = require('../helpers/index');

async function createContact(req, res, next) {
  const { user } = req;
  const { id: contactId } = req.body;

  user.contacts.push({ _id: contactId });
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
  const tmpPath = path.resolve(__dirname, '../tpm', filename);
  const publicPath = path.resolve(__dirname, '../public/avatars', filename);

  await Jimp.read(tmpPath)
    .then((image) => {
      return image.resize(250, 250).write(tmpPath);
    })
    .catch((error) => {
      console.error(error);
    });

  try {
    await fs.rename(tmpPath, publicPath);
  } catch (error) {
    await fs.unlink(tmpPath);
    return error;
  }

  const upUser = await User.findByIdAndUpdate(
    id,
    {
      avatarURL: `/public/avatars/${filename}`,
    },
    {
      new: true,
    }
  );
  console.log('upUser', upUser);
}

async function verifyEmail(req, res, next) {
  const { verificationToken } = req.params;
  const user = await User.findOne({
    verificationToken: verificationToken,
  });

  if (!user) {
    throw NotFound('Verify token is not valid! User not found');
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  return res.status(200).json({
    message: 'Verification successful',
  });
}

async function repeatVerifyEmail(req, res, next) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: 'Missing required field email',
    });
  }

  try {
    const storedUser = await User.findOne({
      email,
    });

    if (!storedUser) {
      return res.status(400).json({
        message: 'User not found',
      });
    }

    const verificationToken = storedUser.verificationToken;

    if (!verificationToken) {
      return res.status(400).json({
        message: 'Verification has already been passed',
      });
    }

    await sendMail({
      to: email,
      subject: 'Please confirm your email',
      html: `<a href="localhost:3000/api/users/verify/${verificationToken}">Confirm your email</a>`,
    });

    res.status(201).json({
      user: {
        email,
        subscription: storedUser.subscription,
        id: storedUser._id,
        avatarURL: storedUser.avatarURL,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

module.exports = {
  createContact,
  getContacts,
  getCurrentUser,
  updateAvatar,
  verifyEmail,
  repeatVerifyEmail,
};
