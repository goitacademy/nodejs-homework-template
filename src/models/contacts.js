const { Contact } = require("../db/contactsSchema.js");

const listContacts = async () => {
  try {
    const data = await Contact.find({});
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (err) {
    throw new Error(err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contact = await Contact.findByIdAndRemove(contactId);
    return contact;
  } catch (err) {
    throw new Error(err.message);
  }
};

const addContact = async (body) => {
  try {
    const contact = new Contact({ ...body });
    await contact.save();
    return contact;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    await Contact.findByIdAndUpdate(contactId, body);
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateStatusContact = async (contactId, body) => {
  try {
    await Contact.findByIdAndUpdate(contactId, body);
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
