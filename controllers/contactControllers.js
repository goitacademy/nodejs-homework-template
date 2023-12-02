const Contact = require("../models/contacts");

const listContacts = async (userId) => {
  const contacts = await Contact.find({ owner: userId });
  return contacts;
};

const getContactById = async (contactId, userId) =>{
  const contact = await Contact.findOne({ _id: contactId, owner: userId });
  return contact;
};

const removeContact = async (contactId, userId) =>
   {
  const deletedContact = await Contact.findOneAndDelete({ _id: contactId, owner: userId });
  return deletedContact;
};

const addContact = async (body, userId) => {
  const newContact = await Contact.create({ ...body, owner: userId });
  return newContact;
};

const updateContact = async  (contactId, body, userId) => {
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    body,
    { new: true }
  );
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
