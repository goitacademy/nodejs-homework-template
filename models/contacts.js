const fs = require('fs/promises')
const path = require('path')
const {nanoid} = require('nanoid')

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const contactsText = await fs.readFile(contactsPath);
  return JSON.parse(contactsText);
}

const getContactById = async (contactId) => {
  const id = String(contactId);
  const contacts = await listContacts();
  const contactById = contacts.find(contact => contact.id === id);
  return contactById || null;
}

const removeContact = async (contactId) => {
  const id = String(contactId);
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === id);
  if (index !== -1) {
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } else {
    return null;
  }
}

const addContact = async ({name, email, phone}) => {
  const newContact = { id: nanoid(), name, email, phone };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const id = String(contactId);
  const index = contacts.findIndex(contact => contact.id === id);
  if (index !== -1) {
    contacts[index] = {id, ...body}
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
