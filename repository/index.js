const Contact = require("../model/contact");

const listContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactById = async (contactId) => {
  const contact = await Contact.findById({ contactId });
  return contact;
};

const removeContact = async (contactId) => {
  const contact = await Contact.findByIdAndRemove({ _id: contactId });
  return contact;
};

const addContact = async (body) => {
  const newContact = await Contact.create(body);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const updateContact = await Contact.findByIdAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true }
  );
  return updateContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
