const fs = require("node:fs/promises");
const path = require("node:path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const readContacts = async () => {
  const data = await fs.readFile(contactsPath, "UTF-8");
  const contacts = JSON.parse(data);

  return contacts;
};

const writeContacts = async (contacts) => {
  const newContacts = await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, 2)
  );

  return newContacts;
};

const listContacts = async () => {
  const contacts = await readContacts();

  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === contactId);

  return contact || null;
};

const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return undefined;
  }

  const newContacts = [
    ...contacts.slice(0, index),
    ...contacts.slice(index + 1),
  ];
  await writeContacts(newContacts);

  return contacts[index];
};

const addContact = async (body) => {
  const contacts = await readContacts();
  const newContact = { id: nanoid(), ...body };
  contacts.push(newContact);
  await writeContacts(contacts);

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
