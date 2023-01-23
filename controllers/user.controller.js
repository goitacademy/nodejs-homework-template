const { BadRequest, NotFound } = require('http-errors');
const { User } = require('../models/user');

async function createContact(req, res, next) {
  const { user } = req;
  const { id: contactId } = req.body;

  user.contacts.push(contactId);
  await User.findByIdAndUpdate(user._id, user, {
    new: true,
  });

  return res.status(201).json({
    data: {
      contacts: user.contacts,
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
  const { email, _id: id, subscription } = user;
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
      },
    },
  });
}

module.exports = {
  createContact,
  getContacts,
  current,
  updateStatusUser,
};
