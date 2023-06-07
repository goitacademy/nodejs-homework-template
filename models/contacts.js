const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

const updateList = async contact =>
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const contactByID = contacts.filter(({ id }) => id === contactId);
  return contactByID.length === 0 ? null : contactByID;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) return null;
  const [contact] = contacts.splice(index, 1);
  await updateList(contacts);
  return contact;
};

const addContact = async body => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);
  await updateList(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) return null;
  contacts[index] = { ...contacts[index], ...body };
  await updateList(contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
