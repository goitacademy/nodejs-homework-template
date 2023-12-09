const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

async function listContacts() {
  const listContacts = await fs.readFile(contactsPath);
  return JSON.parse(listContacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const contactIndex = allContacts.findIndex(({ id }) => id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  const deletedContact = allContacts.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return deletedContact;
}

async function addContact(body) {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  const newArray = [newContact, ...allContacts];
  await fs.writeFile(contactsPath, JSON.stringify(newArray));
  return newContact;
}

async function updateContact(contactId, body) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  allContacts[index] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
