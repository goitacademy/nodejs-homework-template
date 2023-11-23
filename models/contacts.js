const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);

  return JSON.parse(contacts);
};

const getContactById = async contactId => {
  const contacts = await listContacts();

  return contacts.find(contact => contact.id === contactId);
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const contactIdx = contacts.findIndex(contact => contact.id === contactId);
  const contactToDelete = contacts.splice(contactIdx, 1);

  if (contactIdx === -1) return null;

  return contactToDelete;
};

const addContact = async ({ name, email, phone }) => {
  const { nanoid } = await import("nanoid");
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();
  const contactToUpdate = contacts.find(contact => contact.id === contactId);

  return {
    ...contactToUpdate,
    name,
    email,
    phone,
  };
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
