const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

const write = async payload => {
  await fs.writeFile(contactsPath, JSON.stringify(payload, null, 2));
};

/**
 * Returns all contacts from DB.
 */
const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

/**
 * Returns contact with the specified ID.
 */
const getContactById = async contactId => {
  const contacts = await listContacts();
  return contacts.find(contact => contact.id === contactId);
};

/**
 * Removes contact with the specified ID.
 */
const removeContact = async contactId => {
  const contacts = await listContacts();
  for (let i = 0; i < contacts.length; i += 1) {
    if (contacts[i].id === contactId) {
      const removed = contacts.splice(i, 1).at(0);
      await write(contacts);
      return removed;
    }
  }
  return null;
};

/**
 * Adds contact with specified params.
 * Generates new id automatically.
 */
const addContact = async (body) => {
  const contacts = await listContacts();
  const payload = { id: nanoid(), ...body };
  contacts.push(payload);
  await write(contacts);
  return payload;
};

/**
 * Updates existing contact fields with new values.
 */
const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  for (let i = 0; i < contacts.length; i += 1) {
    if (contacts[i].id === contactId) {
      const payload = {...contacts[i], ...body};
      contacts.splice(i, 1, payload).at(0);
      await write(contacts);
      return payload;
    }
  }
  return null;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
