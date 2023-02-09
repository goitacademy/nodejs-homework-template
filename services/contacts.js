// const fs = require('fs/promises');
// const path = require('path');
// const { runInNewContext } = require('vm');

const { Contact } = require('./schemas/contact');

// const pathContacts = path.resolve('../models/contacts.json');
// const pathContacts = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  return await Contact.find();
};

const getContactById = async contactId => {
  return await Contact.findOne({ _id: contactId });
};

const addContact = async body => {
  return await Contact.create(body);
};

// const removeContact = async contactId => {
//   try {
//     const contactsList = await listContacts();
//     const newContactsList = contactsList.filter(el => el.id !== contactId);
//     await fs.writeFile(pathContacts, JSON.stringify(newContactsList), 'utf8');
//   } catch (error) {
//     console.error(error);
//   }
// };

// const updateContact = async (contactId, body) => {
//   try {
//     const contactsList = await listContacts();
//     const contact = contactsList.find(el => el.id === contactId);

//     if (contact === undefined) {
//       return null;
//     }

//     const contactUpdated = { ...contact, ...body };
//     await removeContact(contactId);
//     await addContact(contactUpdated);
//     return contactUpdated;
//   } catch (error) {
//     console.error(error);
//   }
// };

module.exports = {
  listContacts,
  getContactById,
  // removeContact,
  addContact,
  // updateContact,
};
