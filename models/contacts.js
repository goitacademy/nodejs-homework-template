const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

const readContactsFromFile = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeContactsToFile = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const contacts = await readContactsFromFile();
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await readContactsFromFile();
  return contacts.find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await readContactsFromFile();
  const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
  await writeContactsToFile(updatedContacts);
};

const addContact = async (body) => {
  const contacts = await readContactsFromFile();
  const newContact = { id: Date.now().toString(), ...body };
  contacts.push(newContact);
  await writeContactsToFile(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await readContactsFromFile();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...body };
    await writeContactsToFile(contacts);
    return contacts[index];
  } else {
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};