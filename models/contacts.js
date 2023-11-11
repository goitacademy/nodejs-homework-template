const fs = require('fs/promises');
const path = require('path');

const contactsFilePath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const contactsData = await fs.readFile(contactsFilePath, 'utf-8');
  const contacts = JSON.parse(contactsData);
  return contacts;
};

const getContactById = async contactId => {
  const contactsData = await fs.readFile(contactsFilePath, 'utf-8');
  const contacts = JSON.parse(contactsData);
  const contact = contacts.find(c => c.id === contactId);
  return contact;
};

const removeContact = async contactId => {
  const contactsData = await fs.readFile(contactsFilePath, 'utf-8');
  const contacts = JSON.parse(contactsData);
  const updatedContacts = contacts.filter(c => c.id !== contactId);
  await fs.writeFile(
    contactsFilePath,
    JSON.stringify(updatedContacts, null, 2)
  );
  return true;
};

const addContact = async body => {
  const contactsData = await fs.readFile(contactsFilePath, 'utf-8');
  const contacts = JSON.parse(contactsData);

  const newContact = { id: Date.now().toString(), ...body };
  contacts.push(newContact);

  await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contactsData = await fs.readFile(contactsFilePath, 'utf-8');
  const contacts = JSON.parse(contactsData);

  const index = contacts.findIndex(c => c.id === contactId);

  if (index === -1) {
    throw new Error('Contact not found');
  }

  const updatedContact = { ...contacts[index], ...body };
  contacts[index] = updatedContact;

  await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
