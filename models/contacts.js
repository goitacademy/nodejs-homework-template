const path = require("path");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "../models/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contactsList = await listContacts();
  const queryContact = contactsList.find((contact) => contact.id === contactId);

  if (!queryContact) {
    return null;
  }
  return queryContact;
};

const removeContact = async (contactId) => {
  const contactsList = await listContacts();
  const queryIndex = contactsList.findIndex(
    (contact) => contact.id === contactId
  );
  if (queryIndex === -1) {
    return null;
  }
  const [removedContact] = contactsList.splice(queryIndex, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contactsList));

  return removedContact;
};

const addContact = async (body) => {
  const contactsList = await listContacts();

  const createdContact = {
    id: uuidv4(),
    ...body,
  };

  contactsList.push(createdContact);

  await fs.writeFile(contactsPath, JSON.stringify(contactsList));

  return createdContact;
};

const updateContact = async (contactId, body) => {
  const contactsList = await listContacts();
  const queryIndex = contactsList.findIndex(
    (contact) => contact.id === contactId
  );
  if (queryIndex === -1) {
    return null;
  }
  contactsList[queryIndex] = { id: contactId, ...body };

  await fs.writeFile(contactsPath, JSON.stringify(contactsList));
  return contactsList[queryIndex];
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
