const fs = require('fs/promises')
const path = require('path');
const contactsPath = path.join(__dirname, './contacts.json');

async function updateContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

const getContactById = async (contactId) => {
  const data = await listContacts();
  const result = await data.find(item => item.id === contactId);
  return result || null;
}

const updateById = async (contactId, name, email, phone) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { contactId, ...name, ...email, ...phone };
  await updateContacts(contacts);
  return contacts[index];
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
}

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    ...name,
    ...email,
    ...phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
}
