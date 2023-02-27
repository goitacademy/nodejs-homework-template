// const { V4MAPPED } = require('dns');
// const fs = require('fs/promises');
// const path = require('path');
// const { v4 } = require('uuid');

const { Contact } = reqire('../shemas/contacts.js');

// const updateContacts = require('./updateContacts');

// const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async (req, res) => {
  const contact = Contact.find({});
  res.json(contact);
};

const getContactById = async (req, res) => {
    const { id } = req.params;
    const contact = await Contact.findById()
};

const removeContact = async contactId => {
//   const allContacts = await listContacts();
//   const idx = allContacts.findIndex(contact => contact.id === contactId);
//   if (idx === -1) {
//     return null;
//   }
//   const newContacts = allContacts.filter((_, index) => index !== idx);
//   await updateContacts(newContacts);
//   return allContacts[idx];
};

const addContact = async (req, res) => {
  const contact = new Contact({
    name,
    phone,
    email,
  }) = req.body;
  await contact.save();
  res.json({ status: 'success' });
};

const updateContact = async (id, data) => {
//   const allContacts = await listContacts();
//   const idx = allContacts.findIndex(contact => contact.id === id);
//   if (idx === -1) {
//     return null;
//   }
//   allContacts[idx] = { id, ...data };
//   await updateContacts(allContacts);

//   return allContacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
