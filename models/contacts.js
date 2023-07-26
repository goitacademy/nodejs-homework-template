const fs = require("fs/promises");
const path = require("node:path");

const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const searchContact = contacts.find((item) => item.id === String(contactId));

  return searchContact || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const indexContact = contacts.findIndex(
    (contact) => contact.id === String(contactId)
  );
  console.log(indexContact)
  if (indexContact === -1) {
    return null;
  }
  const deleteContact = contacts[indexContact];
  contacts.splice(indexContact, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deleteContact;
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
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = {
    id: contactId,
    ...body,
  };
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
