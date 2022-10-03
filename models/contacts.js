const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.resolve('./models/contacts.json');

const updateContacts = async (contact) =>
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));

const listContacts = async () => {
  const allContacts = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(allContacts);
};

const getContactById = async (contactId) => {
  const arrayContacts = await listContacts();
  const contactIdString = String(contactId);
  const contacts = arrayContacts.find(
    (contact) => contact.id === contactIdString
  );
  return contacts || null;
};

const removeContact = async (contactId) => {
  contactIdString = String(contactId);
  const arrayContacts = await listContacts();
  const index = arrayContacts.findIndex(
    (item) => item.id === contactIdString
  );
  if (index === -1) {
    return null;
  }
  const [result] = arrayContacts.splice(index, 1);
  await updateContacts(arrayContacts);
  return result;
};

const addContact = async (body) => {
  const arrayContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  arrayContacts.push(newContact);
  await updateContacts(arrayContacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const id = contactId;
  const contactIdString = String(contactId);
  const contact = await listContacts();
  const index = contact.findIndex(
    (item) => item.id === contactIdString
  );
  if (index === -1) {
    return null;
  }
  contact[index] = { id, ...body };
  await updateContacts(contact);
  return contact[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
