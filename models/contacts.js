const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require('path');
const contactsPath = path.resolve(__dirname, 'contacts.json');

const updateContacts = async (data) => {
  fs.writeFile(contactsPath, JSON.stringify(data, null, 2))
};


const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const data = await listContacts();
  const searchId = data.find((item) => item.id === contactId);
  return searchId || null;
}

const removeContact = async (contactId) => {
  const data = await listContacts();
  const indexDeleteContact = data.findIndex((item) => item.id === contactId);
  if (indexDeleteContact === -1) {
    return null
  };
  const [deletedContact] = data.splice(indexDeleteContact, 1);
  await updateContacts(data);
  return deletedContact;
}

const addContact = async ({ name, email, phone }) => {
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    name, email, phone
  };
  data.push(newContact);
  await updateContacts(data);
  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    throw new Error('Contacts not found')
  }
  contacts[index] = {
    ...contacts[index],
    ...body
  };
  await updateContacts(contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
