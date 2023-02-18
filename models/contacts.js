const path = require('path');
const fs = require('fs/promises');

const pathContacts = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  return (await fs.readFile(pathContacts, 'utf8')) || null;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactsArray = JSON.parse(contacts);
  const res = contactsArray.find((option) => option.id === contactId);
  return res || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactsArray = JSON.parse(contacts);
  const index = contactsArray.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contactsArray.splice(index, 1);
  await fs.writeFile(pathContacts, JSON.stringify(contactsArray, null, 2));
  console.log(result);
  return result;
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
