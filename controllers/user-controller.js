const { User } = require("../models/user");

async function createContact(req, res, next) {
  const { user } = req;
  const { id: contactId } = req.body;

   user.contacts.push({ _id: contactId });
  const updatedUser = await User.findByIdAndUpdate(user._id, user, {
    new: true,
    fields: { contacts: 1 },
  });
  return res.status(201).json({
    data: {
      contacts: updatedUser.contacts,
    },
  });
}

async function getContacts(req, res, next) {
  const { user } = req;

  const userWithContacts = await User.findById(user._id).populate("contacts", {
    name: 1,
    email: 1,
    phone: 1,
    _id: 1,
  });
  return res.status(200).json({
    data: {
      contacts: userWithContacts.contacts,
    },
  });
}

async function me(req, res, next) {
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



module.exports = {
  createContact,
  getContacts,
  me
};