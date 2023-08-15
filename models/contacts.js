const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const searchedContact = contacts.find((el) => el.id === contactId);

  return searchedContact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((el) => el.id === contactId);

  if (index === -1) return null;

  const [result] = contacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return result;
}

async function addContact(data) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
}

async function updateContact(contactId, data) {
  const contacts = await listContacts();
  const contact = await getContactById(contactId);
  const newContact = { ...contact, ...data };
  const index = contacts.findIndex((el) => el.id === contactId);

  if (index === -1) return null;

  contacts.splice(index, 1, newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
