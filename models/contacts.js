// const fs = require('fs/promises')

// const fs = require('fs/promises');
// const path = require('path');
// const { nanoid } = require('nanoid');

// const contactsPath = path.join(__dirname, 'db', 'contacts.json');

// const getListContacts = async () => {
//   const data = await fs.readFile(contactsPath);
//   return JSON.parse(data);
// };

// const getContactById = async id => {
//   const contacts = await getListContacts();
//   const result = contacts.find(contact => contact.id === id);
//   return result || null;
// };

// const addContact = async ({ name, email, phone }) => {
//   const contacts = await getListContacts();
//   const newContact = {
//     id: nanoid(),
//     name,
//     email,
//     phone,
//   };
//   contacts.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return newContact;
// };

// const updateContactById = async ({ id, data }) => {
//   const contacts = await getListContacts();
//   const index = contacts.findIndex(contact => contact.id === id);
//   if (index === -1) {
//     return null;
//   }
//   contacts[index] = { id, ...data };
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return contacts[index];
// };

// const removeContactById = async id => {
//   const contacts = await getListContacts();
//   const index = contacts.findIndex(contact => contact.id === id);
//   if (index === -1) {
//     return null;
//   }
//   const [result] = contacts.splice(index, 1);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return result;
// };

const listContacts = async () => {};

const getContactById = async contactId => {};

const removeContact = async contactId => {};

const addContact = async body => {};

const updateContact = async (contactId, body) => {};

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
