const { nanoid } = require("nanoid");

const fs = require("fs/promises");

const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(id) {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data).find((contact) => contact.id === id) || null;
}

async function removeById(id) {
  const getContact = await listContacts();
  const index = getContact.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = getContact.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(getContact, null, 2));
  return result;
}

async function addContact({ name, email, phone }) {
  const addNewContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const getContact = await listContacts();
  getContact.push(addNewContact);
  await fs.writeFile(contactsPath, JSON.stringify(getContact, null, 2));
  return addNewContact;
}

async function updateById(id, { name, email, phone }) {
  const getContact = await listContacts();
  const index = getContact.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  getContact[index] = { id, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(getContact, null, 2));
  return getContact[index];
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeById,
  updateById,
};
