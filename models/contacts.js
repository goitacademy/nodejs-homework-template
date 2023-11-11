const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

const updateFile = async contacts => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === contactId);
  return result || null;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) return null;
  const [result] = contacts.splice(index, 1);
  await updateFile(contacts);
  return result;
};

const addContact = async body => {
  const contacts = await listContacts();
  const phoneDuplicate = contacts.find(item => item.phone === body.phone);
  if (phoneDuplicate)
    return { message: 'Contact with same number already exists' };

  const contactToAdd = { id: nanoid(), ...body };
  contacts.push(contactToAdd);
  await updateFile(contacts);
  return contactToAdd;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) return null;
  const contactToUpdate = { ...contacts[index], ...body };
  contacts.splice(index, 1, contactToUpdate);
  await updateFile(contacts);
  return contactToUpdate;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
