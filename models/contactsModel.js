const Contacts = require('../service/schemas');

const listContacts = async userId => {
  return await Contacts.find({ owner: userId });
};

const getContactById = async (contactId, userId) => {
  return await Contacts.findOne({ _id: contactId, owner: userId });
};

const removeContact = async (contactId, userId) => {
  return await Contacts.findByIdAndRemove({ _id: contactId, owner: userId });
};

const addContact = async ({ name, email, phone, favorite }, userId) => {
  return await Contacts.create({ name, email, phone, favorite, owner: userId });
};

const updateContact = async (userId, contactId, body) => {
  return await Contacts.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    body,
    {
      new: true,
    }
  );
};

const updateStatusContact = async (userId, contactId, favorite) => {
  return await Contacts.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    { favorite },
    {
      new: true,
    }
  );
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
