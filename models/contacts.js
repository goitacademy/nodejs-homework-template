const path = require("path");
const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const jsonContactsRead = await fs.readFile(contactsPath);
  const contactsReadResult = JSON.parse(jsonContactsRead);
  return contactsReadResult;
};

const getContactById = async (contactId) => {
  const allContactsList = await listContacts();
  const foundContact = allContactsList.find(
    (contact) => contact.id === contactId
  );
  return foundContact || null;
};

const removeContact = async (contactId) => {
  const allContactsList = await listContacts();
  const index = allContactsList.findIndex(
    (contact) => contact.id === contactId
  );
  if (index === -1) {
    return null;
  }

  const [result] = allContactsList.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContactsList, null, 2));
  return result;
};

const addContact = async (body) => {
  const allContactsList = await listContacts();
  const newContact = {
    id: nanoid(),
    body,
  };

  allContactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContactsList, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContactsList = await listContacts();
  const index = allContactsList.findIndex(
    (contact) => contact.id === contactId
  );
  if (index === -1) {
    return null;
  }

  allContactsList[index] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(allContactsList, null, 2));
  return allContactsList[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
