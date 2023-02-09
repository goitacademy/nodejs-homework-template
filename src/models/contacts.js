const fs = require('fs/promises');
const path = require('path');

const filePath = path.resolve('src/models', 'contacts.json');

const listContacts = async () => {
  const contacts = await fs.readFile(filePath, 'utf8');

  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((c) => c.id === contactId);

  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  let removedContact;
  const newContacts = contacts.filter((c) => {
    if (c.id === contactId) {
      removedContact = c;
      return false;
    }
    return true;
  });
  await fs.writeFile(filePath, JSON.stringify(newContacts), 'utf-8');

  return removedContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();

  contacts.push(body);
  await fs.writeFile(filePath, JSON.stringify(contacts), 'utf8');

  return body;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  let updatedContact;

  const updatedContacts = contacts.map((c) => {
    if (c.id === contactId) {
      updatedContact = { ...c, ...body };
      return updatedContact;
    }
    return c;
  });

  if (updatedContact) {
    await fs.writeFile(filePath, JSON.stringify(updatedContacts), 'utf8');
  }

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
