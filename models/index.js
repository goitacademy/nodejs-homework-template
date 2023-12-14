const fs = require("fs").promises;
const uuid = require("uuid").v4;
const path = require("path");

const contactsPath = path.join(__dirname, "../models/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);

  return contacts;
};

const contactById = async (contactId) => {
  const data = await listContacts();
  const result = data.find((contact) => contact.id === contactId);

  if (!result) {
    return null;
  }
  return result;
};

const addNewContact = async (body) => {
  const contacts = await listContacts();

  const newContact = {
    id: uuid(),
    ...body,
  };

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};

const deleteContact = async (contactId) => {
  const contacts = await listContacts();

  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (contactIndex === -1) {
    return null;
  }
  const deletedContact = contacts.splice(contactIndex, 1)[0];

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return deletedContact;
};

const updateItem = async (contactId, body) => {
  const contacts = await listContacts();

  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex === -1) {
    return null;
  }
  contacts[contactIndex] = { ...contacts[contactIndex], ...body };

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contacts[contactIndex];
};

module.exports = {
  listContacts,
  contactById,
  addNewContact,
  deleteContact,
  updateItem,
};
