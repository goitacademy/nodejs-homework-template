const { Contacts } = require("../models/contact");

const getContacts = async (owner) => {
  return await Contacts.find({ owner });
};

const getContactById = async (contactId, owner) => {
  return await Contacts.findOne({ _id: contactId, owner });
};

const addContact = async ({ name, email, phone, favorite }, owner) => {
  return await Contacts.create({ name, email, phone, favorite, owner });
};

const removeContact = async (contactId, owner) => {
  return await Contacts.findOneAndRemove({ _id: contactId, owner });
};

const updateContact = async (contactId, body, owner) => {
  return await Contacts.findOneAndUpdate({ _id: contactId, owner }, body, {
    new: true,
    runValidators: true,
  });
};

const updateStatusContact = async (contactId, body, owner) => {
  return await Contacts.findOneAndUpdate(
    { _id: contactId, owner },
    { favorite: body.favorite },
    {
      new: true,
      runValidators: true,
    }
  );
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
