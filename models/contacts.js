const fs = require("fs/promises");
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

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
