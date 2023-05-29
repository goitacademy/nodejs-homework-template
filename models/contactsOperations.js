const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = await contacts.find(({ id }) => id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactIndex = await contacts.findIndex(({ id }) => id === contactId);

  if (contactIndex === -1) {
    return null;
  }

  const [contactToDelete] = contacts.splice(contactIndex, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contactToDelete;
};

const addContact = async (body) => {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    ...body,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  const contactIndex = await contacts.findIndex(({ id }) => id === contactId);

  if (contactIndex === -1) {
    return null;
  }

  contacts[contactIndex] = { ...body };
  contacts[contactIndex].id = contactId;

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
