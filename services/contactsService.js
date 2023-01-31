const { Contacts } = require("../models/contact");

const getContacts = async () => {
  return await Contacts.find();
};

const getContactById = async (contactId) => {
  return await Contacts.findById(contactId);
};

const addContact = async ({ name, email, phone, favorite }) => {
  return await Contacts.create({ name, email, phone, favorite });
};

const removeContact = async (contactId) => {
  return await Contacts.findByIdAndRemove(contactId);
};

const updateContact = async (contactId, body) => {
  return await Contacts.findByIdAndUpdate(contactId, body, {
    new: true,
    runValidators: true,
  });
};

const updateStatusContact = async (contactId, body) => {
  return await Contacts.findByIdAndUpdate(
    contactId,
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
