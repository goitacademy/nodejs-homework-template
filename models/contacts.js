const fs = require("fs/promises");
const path = require("path");
const { uuid } = require("uuidv4");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  const parsedContacts = JSON.parse(contacts);
  return parsedContacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const getContact = contacts.find((item) => item.id === String(contactId));

  if (!getContact) {
    return null;
  }

  return getContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === String(contactId));
  const newContactList = contacts.filter((_, index) => index !== idx);

  if (newContactList === -1) {
    return null;
  }

  await fs.writeFile(contactsPath, JSON.stringify(newContactList));
  return contacts[idx];
};

const addContact = async (body) => {
  const contacts = await listContacts();

  const newContact = { id: uuid(), ...body };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === String(contactId));

  if (idx === -1) {
    return null;
  }

  contacts[idx] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
