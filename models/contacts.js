const { Contacts } = require("./db-connection");

const listContacts = async () => {
  const contacts = await Contacts.find({});
  return contacts;
};

const getContactById = async (contactId) => {
  const contact = await Contacts.findById(contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const removedContact = await Contacts.findByIdAndRemove(contactId);
  return removedContact;
};

const addContact = async (body) => {
  const newContact = await Contacts.create(body);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contact = await Contacts.findByIdAndUpdate(
    contactId,
    { ...body },
    { new: true }
  );
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
