const Contact = require("../service/schemas/contact.js");

const listContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const getContactById = async (contactId) => {
  const res = await Contact.findById(contactId);
  return res || null;
};

const removeContact = async (contactId) => {
  const res = await Contact.findByIdAndDelete(contactId);

  return res || null;
};

const addContact = async (body) => {
  const res = await Contact.create(body);
  return res || null;
};

const updateContact = async (contactId, body) => {
  const res = await Contact.findByIdAndUpdate(contactId, body, {new: true});

  return res || null;
};

const updateStatusContact = async (contactId, body) => {
  const res = await Contact.findByIdAndUpdate(contactId, body, {new: true});
  return res || null;
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
