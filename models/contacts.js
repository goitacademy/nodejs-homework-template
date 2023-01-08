const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contactsList = await listContacts();
  const [findContact] = contactsList.filter((item) => item.id === contactId);
  return findContact;
};

const removeContact = async (contactId) => {
  const contactsList = await listContacts();
  const idx = contactsList.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removedContact] = contactsList.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList));

  return removedContact;
};

const addContact = async (body) => {
  const contactsList = await listContacts();
  const contact = { id: uuidv4(), ...body };
  contactsList.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList));
  return contact;
};

const updateContact = async (contactId, body) => {
  const contactsList = await listContacts();
  const idx = contactsList.findIndex((contact) => contact.id === contactId);

  if (idx === -1) {
    return null;
  }

  contactsList[idx] = { contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contactsList));

  return contactsList[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
