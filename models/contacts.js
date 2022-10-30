const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.resolve("models/contacts.json");

async function readList() {
  const data = await fs.readFile(contactsPath, "utf8");

  return JSON.parse(data);
}

async function getListContacts() {
  const data = await readList();

  return data;
}

async function getContactById(contactId) {
  const list = await readList();
  const result = list.find((contacts) => contacts.id === contactId.toString());

  return result || null;
}

async function removeContact(contactId) {
  const list = await readList();
  const findContact = list.find((contact) => contact.id === contactId);
  const result = list.filter((contact) => contact.id !== contactId.toString());
  await fs.writeFile(contactsPath, JSON.stringify(result), "utf8");

  return findContact;
}

async function addContact({ name, email, phone }) {
  const id = shortid.generate();
  const list = await readList();
  const newContact = { id, name, email, phone };
  const newList = [...list, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newList), "utf8");

  return newContact;
}

async function updateContact(contactId, { name, email, phone }) {
  const list = await readList();
  const index = list.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  list[index] = { contactId, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2), "utf8");

  return list[index];
}

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

// const fs = require("fs").promises;
// const path = require("path");
// const shortid = require("shortid");

// const contactsPath = path.resolve("models/contacts.json");

// async function readList() {
//   const data = await fs.readFile(contactsPath, "utf8");

//   return JSON.parse(data);
// }

// async function listContacts() {
//   const data = await readList();

//   return data;
// }

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
