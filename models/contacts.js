const contacts = require('./contacts.json');
const fs = require('fs/promises');

const path = require('path');
const contactsPath = path.join(__dirname, 'contacts.json');

const createId = function (length = 6) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return await JSON.parse(data);
};

const getContactById = async contactId => {
  const list = await listContacts();
  const result = await list.find((el, idx) => el.id === contactId);
  return result || null;
};

const removeContact = async contactId => {
  const id = String(contactId);
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === id);
  if (idx === -1) {
    return null;
  }
  const [result] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async body => {
  const contacts = await listContacts();
  const newObj = {
    id: createId(27),
    ...body,
  };
  contacts.push(newObj);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newObj;
};

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const contact = await getContactById(id);
  const idx = contacts.findIndex(item => item.id === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id, ...contact, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
