const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
};

const getContactById = async (contactId) => {
  const contactsList = await listContacts();
  const result = await contactsList.find((contact) => contact.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contactsList = await listContacts();
  const result = await contactsList.find((contact) => contact.id === contactId);
  const resultIndex = await contactsList.findIndex(
    (contact) => contact.id === contactId
  );
  if (resultIndex === -1) {
    return null;
  }
  contactsList.splice(resultIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return result;
};

const addContact = async (body) => {
  const contactsList = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contactsList = await listContacts();
  const resultIndex = await contactsList.findIndex(
    (contact) => contact.id === contactId
  );
  if (resultIndex === -1) {
    return null;
  }
  contactsList[resultIndex] = {id: contactId, ...body};
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return contactsList[resultIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
