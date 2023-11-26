const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  const objById = data.find(({ id }) => id === contactId);

  return objById ?? null;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const idxEl = data.findIndex(({ id }) => id === contactId);

  if (idxEl < 0) {
    return null;
  }

  const removedEl = data.splice(idxEl, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

  return removedEl;
}

async function addContact(obj) {
  const data = await listContacts();
  const newEl = { id: nanoid(), ...obj };

  data.push(newEl);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

  return newEl;
}

async function updateContact(contactId, obj) {
  const data = await listContacts();
  const idxEl = data.findIndex(({ id }) => id === contactId);

  if (idxEl < 0) {
    return null;
  }

  obj.id = contactId;
  data.splice(idxEl, 1, obj);

  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

  return obj;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
