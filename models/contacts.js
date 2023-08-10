const { v4: uuidv4 } = require("uuid");
const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);

  const contactsList = JSON.parse(data);

  return contactsList;
};

const getById = async (contactId) => {
  const contactsList = await listContacts();

  const findContactById = contactsList.find(
    (contact) => contact.id === contactId
  );

  if (!findContactById) {
    return null;
  }

  return findContactById;
};

const addNewContact = async (body) => {
  const contactsList = await listContacts();

  const newContact = { id: uuidv4(), ...body };

  contactsList.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contactsList = await listContacts();

  const index = contactsList.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  contactsList[index] = { id: contactId, ...body };

  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

  return contactsList[index];
};

const removeContact = async (contactId) => {
  const contactsList = await listContacts();

  const index = contactsList.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const [removedContact] = contactsList.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

  return removedContact;
};

module.exports = {
  listContacts,
  getById,
  addNewContact,
  updateContact,
  removeContact,
};
