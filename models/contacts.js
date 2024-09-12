const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  const response = await fs.readFile(contactsPath);
  return JSON.parse(response);
};

const getContactById = async (contactId) => {
  const response = await listContacts();
  const findContact = response.find((contact) => contact.id === contactId);
  return findContact || null;
};

const removeContact = async (contactId) => {
  const response = await listContacts();
  const findContactIdx = response.findIndex(
    (contact) => contact.id === contactId
  );
  if (findContactIdx === -1) {
    return null;
  }
  const getResult = response.splice(findContactIdx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(response, null, 2));

  return getResult;
};

const addContact = async (body) => {
  const response = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  response.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(response, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const response = await listContacts();
  const iDx = response.findIndex((contact) => contact.id === contactId);
  response[iDx] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(response, null, 2));
  return response[iDx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
