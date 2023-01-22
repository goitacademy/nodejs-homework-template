const createError = require("http-errors");
const { User } = require("../models/user");

async function createContact(req, res, next) {
  const { user } = req;
  const { id: contactId } = req.body;

  user.contacts.push(contactId);
  await User.findByIdAndUpdate(user._id, user);

  return res.status(201).json({
    data: {
      contacts: user.contacts,
    },
  });
}

async function getContacts(req, res, next) {
  const { user } = req;
  // const { contacts } = user;

  const userWithContacts = await User.findById(user._id).populate("contacts", {
    name: 1,
    email: 1,
    _id: 1,
  }); // TODO: check bug, doesn't show contacts || .populate("contacts", "name email _id")

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

// update subscription
async function updateStatusUser(req, res, next) {
  const { id } = req.params;
  if (!req.body) {
    throw createError.BadRequest(`Missing field subscription`);
  }
  const result = await Contact.findByIdAndUpdate(id, req.body, res);
  if (!result) {
    throw createError.NotFound(`Contact with <${id}> not found`);
  }
  return res.status(200).json(result);
}

module.exports = {
  createContact,
  getContacts,
  current,
  updateStatusUser,
};
