const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const { nanoid } = require("nanoid");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const listOfContacts = JSON.parse(data);
  return listOfContacts;
};

const getContactById = async (contactId) => {
  const id = String(contactId);
  const listOfContacts = await listContacts();
  const contactByID = listOfContacts.find((contact) => contact.id === id);
  return contactByID || null;
};

const removeContact = async (contactId) => {
  const listOfContacts = await listContacts();
  const contactToRemove = listOfContacts.find(({ id }) => id === contactId);
  if (contactToRemove === -1) {
    return null;
  }
  const data = listOfContacts.filter(({ id }) => id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(data));
  return `contact ${contactToRemove.name} deleted`;
};

const addContact = async (body) => {
  const listOfContacts = await listContacts();
  const id = nanoid();
  const contactToAdd = { id, ...body };
  const data = JSON.stringify([contactToAdd, ...listOfContacts]);
  await fs.writeFile(contactsPath, data);
  return contactToAdd;
};

const updateContact = async (contactId, body) => {
  const listOfContacts = await listContacts();
  const index = listOfContacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  listOfContacts[index] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(listOfContacts));
  return listOfContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
