const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const readedContacts = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(readedContacts);
  return contacts;
};
const getContactById = async (contactId) => {
  const contactIdToString = contactId.toString();
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactIdToString);
  if (!contact) {
    return -1;
  }
  return contact;
};

const removeContact = async (contactId) => {
  const contactIdToString = contactId.toString();
  const contacts = await listContacts();
  const contactIdFromArr = contacts.findIndex(
    ({ id }) => id === contactIdToString
  );
  if (contactIdFromArr === -1) {
    return -1;
  }
  const [deletedContact] = contacts.splice(contactIdFromArr, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return deletedContact;
};

const addContact = async (name, email, phone) => {
  const newContact = { id: uuidv4(), name, email, phone };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIdFromArr = contacts.findIndex(({ id }) => id === contactId);
  if (contactIdFromArr === -1) {
    return -1;
  }
  contacts[contactIdFromArr] = { ...contacts[contactIdFromArr], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  const updatedContact = contacts[contactIdFromArr];
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
