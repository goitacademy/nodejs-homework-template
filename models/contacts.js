const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');
const contactsPath = path.resolve('./models/contacts.json');

const writeContacts = (element) => {
  return fs.writeFile(contactsPath, JSON.stringify(element));

}

const listContacts = async () => {

  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

const get = async (contactId) => {

  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id === contactId);
  if (!result) {
    return null
  }
  return result;

}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id === String(contactId));
  if (idx === -1) {
    return null
  }
  const [remove] = contacts.splice(idx, 1)
  await writeContacts(contacts);
  return remove
}

const addContact = async (body) => {
  const { name, email, phone } = body
  const contacts = await listContacts();
  const newContacts = {
    id: v4(), name, email, phone
  };
  contacts.push(newContacts);
  await writeContacts(contacts);
  return newContacts;
}

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id === String(contactId));
  if (idx === -1) {
    return null
  }
  contacts[idx] = { ...{ id: `${contactId}`, name, email, phone } }
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[idx];
}

module.exports = {
  listContacts,
  get,
  removeContact,
  addContact,
  updateContact,
}
