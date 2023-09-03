const fs = require("fs/promises");
const path = require("path");

const contactsFilePath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const res = await fs.readFile(contactsFilePath);
  return JSON.parse(res);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    contacts.splice(index, 1);
    await writeContacts(contacts);
    return true;
  }
  return false;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: generateUniqueId(),
    ...body,
  };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex !== -1) {
    contacts[contactIndex] = {
      ...contacts[contactIndex],
      ...body,
    };
    await writeContacts(contacts);
    return contacts[contactIndex];
  }
  return null;
};

const writeContacts = async (contacts) => {
  await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
};

const generateUniqueId = () => {
  return Math.random().toString(36).substr(2, 9);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
