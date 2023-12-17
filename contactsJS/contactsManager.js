const fs = require('fs').promises;
const path = require('path');

const contactsFilePath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsFilePath);
  return JSON.parse(data);
};

const getById = async contactId => {
  const contacts = await listContacts();
  return contacts.find(contact => contact.id === Number(contactId));
};

const addContact = async contact => {
  const contacts = await listContacts();
  const newContact = { id: Date.now(), ...contact };
  contacts.push(newContact);
  await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const updatedContacts = contacts.filter(
    contact => contact.id !== Number(contactId)
  );
  await fs.writeFile(
    contactsFilePath,
    JSON.stringify(updatedContacts, null, 2)
  );
  return true;
};

const updateContact = async (contactId, updatedFields) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === Number(contactId));

  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...updatedFields };
    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  }

  return null;
};

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
};
