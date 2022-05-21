const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const sourceContacts = await listContacts();
  const newContacts = sourceContacts.filter(
    (contact) => contact.id !== String(contactId)
  );
  await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf8");
  return sourceContacts.filter((contact) => contact.id === contactId);
};

const addContact = async (body) => {
  const id = await uuidv4();

  const newContact = { id, ...body };

  const sourceContacts = await listContacts();
  const newContacts = [...sourceContacts, newContact];

  await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf8");
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const updateId = contacts.findIndex((item) => item.id === contactId);

  contacts[updateId] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[updateId];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
