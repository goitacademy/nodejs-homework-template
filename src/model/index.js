const { ContactsModel } = require('../db/contactsModel');

const listContacts = async () => {
  return await ContactsModel.find({});
};

const getContactById = async (contactId) => {
  return await ContactsModel.findById(contactId);
};

const addContact = async (body) => {
  const newContact = new ContactsModel(body);
  await newContact.save();
  return newContact;
};

const removeContact = async (contactId) => {
  return await ContactsModel.findByIdAndDelete(contactId);
};

const updateContact = async (contactId, body) => {
  return await ContactsModel.findByIdAndUpdate(
    contactId,
    {
      $set: body,
    },
    { new: true }
  );
};

const updateStatusContact = async (contactId, body) => {
  const { favorite } = body;
  return await ContactsModel.findByIdAndUpdate(
    contactId,
    {
      $set: { favorite },
    },
    { new: true }
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
