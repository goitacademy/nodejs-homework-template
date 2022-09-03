const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const list = await fs.readFile(contactsPath);
  return JSON.parse(list);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contactById = allContacts.find(({ id }) => id === contactId);
  return contactById || null;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  const [newContactsList] = allContacts.splice(index, 1);
  updateContacts(allContacts);
  return newContactsList;
};

const addContact = async ({ name, email, phone }) => {
  const allContacts = await listContacts();
  const newId = String(allContacts.length + 12);
  const newContact = {
    id: newId,
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  updateContacts(allContacts);
  return newContact;
};

const updateContact = async (id, { name, email, phone }) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === id);
  if (index === -1) {
    null;
  }
  allContacts[index] = { id, name, email, phone };
  await updateContacts(allContacts);
  return allContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
