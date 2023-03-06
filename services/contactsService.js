const { Contacts } = require("../db");

const listContacts = async (user) => {
  return await Contacts.find({ owner: user });
};

const getContactById = async (contactId, user) => {
  return await Contacts.find({ _id: contactId, owner: user });
};

const addContact = async (body) => {
  return await Contacts.create(body);
};

const updateContact = async (contactId, user, body) => {
  return await Contacts.findOneAndUpdate(
    { _id: contactId, owner: user },
    body,
    {
      new: true,
    }
  );
};

const removeContact = async (contactId, user) => {
  return await Contacts.findOneAndDelete({ _id: contactId, owner: user });
};

const updateStatusContact = async (contactId, user, body) => {
  return await Contacts.findOneAndUpdate(
    { _id: contactId, owner: user },
    body,
    {
      new: true,
    }
  );
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
