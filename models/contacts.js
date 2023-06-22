const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contact = allContacts.find((contact) => contact.id === contactId);

  return contact || null;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const contactToRemove = allContacts.find(
    (contact) => contact.id === contactId
  );
  if (!contactToRemove) return null;
  const contacts = [...allContacts].filter(
    (contact) => contact.id !== contactId
  );

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contactToRemove;
};

const addContact = async (body) => {
  const allContacts = await listContacts();

  const newContact = {
    id: nanoid(),
    ...body,
  };
  allContacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  const id = contactId;
  allContacts[index] = { id, ...body };

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