const { Contact } = require("../db/contactModel");

const getContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactById = async (id) => {
  const contact = await Contact.findById(id);
  return contact;
};

const addContact = async (body) => {
  const contact = new Contact({ ...body });
  contact.save();
  return contact;
};

const removeContact = async (id) => {
  return await Contact.findByIdAndRemove(id);
};

const updateContact = async (id, body) => {
  const contact = await Contact.findByIdAndUpdate(id, {
    $set: { ...body },
  });
  return contact;
};

const updateStatusContact = async () => {};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
