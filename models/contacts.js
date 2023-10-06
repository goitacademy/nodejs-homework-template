const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

/**
 * Return contacts array
 */
const listContacts = async () => {
  return JSON.parse(await fs.readFile(contactsPath));
};

/**
 * Return contact by Id
 * @param {string} contactId
 */
const getContactById = async contactId => {
  const contact = (await listContacts()).find(
    contact => contact.id === contactId
  );
  return contact || null;
};

/**
 *
 * @param {object} body
 * @returns newContact
 */
const addContact = async ({ name, email, phone }) => {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

/**
 *
 * @param {string} contactId
 * @returns deleted contact
 */
const removeContact = async contactId => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
