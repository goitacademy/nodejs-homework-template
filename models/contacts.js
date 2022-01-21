const { readFile, writeFile } = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const isContactExist = (contact) => contact ?? null;

const normaliseId = (id) => (isNaN(id) ? id : id + "");

async function listContacts() {
  const contacts = await readFile(contactsPath);

  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const normalisedId = normaliseId(contactId);
  const contactById = contacts.find((contact) => contact.id === normalisedId);

  return isContactExist(contactById);
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const normalisedId = normaliseId(contactId);
  const removedContact = contacts.find((contact) => contact.id === normalisedId);
  const newContacts = contacts.filter((contact) => contact.id !== normalisedId);
  await writeFile(contactsPath, JSON.stringify(newContacts, null, 2));

  return isContactExist(removedContact);
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const normalisedId = normaliseId(contactId);
  const idx = contacts.find((contact) => contact.id === normalisedId);

  if (idx === -1) {
    return null;
  }; 

  contacts[idx] = { contactId, ...body };
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
