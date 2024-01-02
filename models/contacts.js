const fs = require('fs/promises');
const { nanoid } = require('nanoid');

const path = require('node:path');

const contactsPath = path.resolve(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async contactId => {
  const data = await listContacts();
  const contactById = data.find(contact => contact.id === contactId);
  return contactById;
};

const removeContact = async contactId => {
  const data = await listContacts();
  const removedContactById = data.findIndex(
    contact => contact.id === contactId
  );

  if (removedContactById === -1) {
    return null;
  }

  const removedContact = data.splice(removedContactById, 1)[0];

  await fs.writeFile(contactsPath, JSON.stringify(data));

  return removedContact;
};

const addContact = async body => {
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };

  data.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(data));

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }

  contacts[index] = { ...contacts[index], ...body };

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
