const fs = require("fs/promises");
const path = require("path");
const ObjectID = require("bson-objectid");
const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find((item) => item.id === contactId);
  if (!contactById) {
    return null;
  }
  return contactById;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    name,
    email,
    phone,
    id: ObjectID(),
  };
  contacts.push(newContact);
  updateContacts(contacts);
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(idx, 1);
  updateContacts(contacts);
  return removedContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((el) => el.id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { name, email, phone };
  updateContacts(contacts);
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

// const fs = require("fs/promises");
// const path = require("path");
// const ObjectID = require("bson-objectid");
// // const contactsPath = require('./contacts.json')

// const contactsPath = path.join(__dirname, "models/contacts.json");

// const updateContacts = async (contacts) => {
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
// };

// const listContacts = async () => {
//   const contacts = await fs.readFile(contactsPath);
//   return JSON.parse(contacts);
// };

// const getContactById = async (contactId) => {
//   const contacts = await listContacts();
//   const contactById = contacts.find((item) => item.id === contactId);
//   if (!contactById) {
//     return null;
//   }
//   return contactById;
// };

// const removeContact = async (contactId) => {
//   const contacts = await listContacts();
//   const idx = contacts.findIndex((item) => item.id === contactId);
//   if (!idx) {
//     return null;
//   }
//   [removedContact] = contacts.splice(idx, 1);
//   updateContacts(contacts);
//   return removedContact;
// };

// const addContact = async (name, email, phone) => {
//   const contacts = await listContacts();
//   const newContact = {
//     name,
//     email,
//     phone,
//     id: ObjectID(),
//   };
//   contacts.push(newContact);
//   updateContacts(contacts);
//   return newContact;
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
// };
