const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const allContacts = await fs.readFile(contactsPath);
  return JSON.parse(allContacts);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const searchedContact = allContacts.find(
    (contact) => contact.id === contactId
  );
  return searchedContact || null;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  const [deletedContact] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return deletedContact;
};

const addContact = async (name, email, phone) => {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return newContact;
};

const updateContact = async (contactId, name, email, phone) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  allContacts[index] = { id:contactId, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
