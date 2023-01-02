const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.resolve(__dirname, './contacts.json');

async function readContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

async function listContacts() {
  return await readContacts();
};

const getContactById = async (contactId) => {
  const contacts = await readContacts();
  const contact = contacts.find((c) => c.id === contactId);
  return contact || null;
}

const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const updateContacts = contacts.filter(contact => contact.id !== contactId);
  await writeContacts(updateContacts);
}

const addContact = async (name, email, phone) => {
  const id = nanoid();
  const newContact = { id, name, email, phone };
  const contacts = await readContacts();
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await readContacts();
  const idx = contacts.findIndex(contact => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id: contactId, ...body };
    
  await writeContacts(contacts);
  
  return contacts[idx];
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
