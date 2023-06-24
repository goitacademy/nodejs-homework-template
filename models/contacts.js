// const fs = require('fs/promises');
// const { nanoid } = require('nanoid');
// const path = require('path');

// const contactsPath = path.join(__dirname, 'contacts.json');



// const listContacts = async () => {
//   try {
//     const data = await fs.readFile(contactsPath, 'utf-8');
//     return JSON.parse(data);
//   } catch (error) {
//     if (error.code === 'ENOENT') {
//       return [];
//     }
//     throw error;
//   }
// };



// const getContactById = async (contactId) => {
//   const contacts = await listContacts();
//   return contacts.find((contact) => contact.id === contactId) || null;
// };



// const removeContact = async (contactId) => {
//   const contacts = await listContacts();
//   const contactIndex = contacts.findIndex((contact) => contact.id === contactId);
//   if (contactIndex === -1) {
//     return null;
//   }
//   const [contactToRemove] = contacts.splice(contactIndex, 1);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return contactToRemove;
// };


// const updateContact = async (contactId, data) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((contact) => contact.id === contactId);
//   console.log(index);
//   if (index === -1) {
//     return null;
//   }
//   contacts[index] = { id: contactId, ...data };
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return contacts[index];
// };

// const addContact = async (data) => {
//   const contacts = await listContacts();
//   const newContact = { id: nanoid(), ...data };
//   contacts.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return newContact;
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };


const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

const handleError = (error) => {
  if (error.code === 'ENOENT') {
    return [];
  }
  throw error;
};

const withErrorHandling = (func) => async (...args) => {
  try {
    return await func(...args);
  } catch (error) {
    return handleError(error);
  }
};

const listContacts = withErrorHandling(async () => {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
});

const getContactById = withErrorHandling(async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
});

const removeContact = withErrorHandling(async (contactId) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((contact) => contact.id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  const [contactToRemove] = contacts.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contactToRemove;
});

const updateContact = withErrorHandling(async (contactId, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  console.log(index);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id: contactId, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
});

const addContact = withErrorHandling(async (data) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), ...data };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
});

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};