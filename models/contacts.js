const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, ".", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
};
const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const findContact = contacts.filter(({ id }) => id === contactId);
  return findContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const updateContacts = [...contacts, body];
  await fs.writeFile(contactsPath, JSON.stringify(updateContacts));
  return body;
};

const removeContact = async (contactId) => {
  const parsedContacts = await listContacts();
  const newList = parsedContacts.filter((contact) => contact.id !== contactId);

  if (parsedContacts.length === newList.length) {
    return null;
  }
  await fs.writeFile(contactsPath, JSON.stringify(newList));
  const contactsAfterRemove = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(contactsAfterRemove);
};

const updateContactById = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((c) => c.id === contactId);
  if (index === -1) {
    return;
  }
  const contact = contacts[index];
  Object.assign(contact, body);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contact;
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
