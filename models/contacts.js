// const fs = require('fs/promises')

// const listContacts = async () => {};

// const getContactById = async (contactId) => {};

// const removeContact = async (contactId) => {};

// const addContact = async (body) => {};

// const updateContact = async (contactId, body) => {};

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };

// --------------------------------------------------------------------

const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");
// console.log(contactsPath);

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(id) {
  const people = await listContacts();
  const result = people.find((item) => item.id === id);
  return result || null;
}

async function removeContact(id) {
  const people = await listContacts();
  const index = people.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = people.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(people, null, 3));
  return result;
}

async function addContact(data) {
  const people = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  people.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(people, null, 3));
  return newContact;
}

const contacts = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

module.exports = contacts;
