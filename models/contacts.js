// contacts.js (модуль з функціями для роботи з контактами)

const Contact = require('./contactModel');


const listContacts = async () => {
  return Contact.find();
};
const getContactById = async (contactId) => {
  return Contact.findById(contactId);
};

const removeContact = async (contactId) => {
  return Contact.findByIdAndRemove(contactId);
};
 

 
const addContact = async ({ name, email, phone }) => {
  return Contact.create({ name, email, phone });
};

const updateContact = async (contactId, { name, email, phone }) => {
  return Contact.findByIdAndUpdate(
    contactId,
    { name, email, phone },
    { new: true }
  );
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
