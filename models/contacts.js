const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await Contacts();

  const contact = contacts.find((item) => item.id === `${contactId}`);

  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const index = contacts.findIndex(({ id }) => id === contactId);
  const deletedContact = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return deletedContact;
};

const addContact = async (body) => {
  const contacts = await Contacts();

  const updateContacts = [...contacts, body];
  await fs.writeFile(contactsPath, JSON.stringify(updateContacts));

  return body;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return;
  }
  const contact = contacts[index];
  Object.assign(contact, body);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contact;
};

const Contacts = async () => {
  const readRes = await fs.readFile(contactsPath);
  const infoJs = JSON.parse(readRes);
  return infoJs;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
