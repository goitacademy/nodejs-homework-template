const { Contact } = require('../models/contactModel');

const getListContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);

  return contact;
};

const addContact = async ({ name, email, phone, favorite }) => {
  const contact = await new Contact({ name, email, phone, favorite });
  await contact.save();
  return contact;
};

const removeContact = async (contactId) => {
  await Contact.findByIdAndRemove(contactId);
};

const updateContact = async (contactId, { name, email, phone, favorite }) => {
  return await Contact.findByIdAndUpdate(contactId, {
    $set: { name, email, phone, favorite },
  });
};

const updateStatusContact = async (contactId, { favorite }) => {
  return await Contact.findByIdAndUpdate(contactId, {
    $set: { favorite },
  });
};

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
