const fs = require('fs/promises');
const uuid = require('uuid').v4;
const path = require('path');
const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const list = await fs.readFile(contactsPath);
  console.log('listContacts:>>', JSON.parse(list));
  return JSON.parse(list);
};

const addContact = async (body) => {
  const data = await listContacts();

  const newContact = {
    id: uuid(),
    ...body,
  };

  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

  return newContact;
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const contact = data.find((item) => item.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);

  const [result] = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

  return result;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
