const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

/**
 * Return all contacts
 * @returns {object}
 */
const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
};

/**
 * Return one contact concerned id
 * @param {string} contactId
 * @returns {object|null}
 */
const getContactById = async contactId => {
  const allContacts = await listContacts();
  const result = allContacts.find(contact => contact.id === contactId);
  return result || null;
};

/**
 * Remove contact from list
 * @param {string} contactId
 * @returns {object|null}
 */
const removeContact = async contactId => {
  const allContacts = await listContacts();
  const contactIndex = allContacts.findIndex(contact => contact.id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  const [result] = allContacts.splice(contactIndex, 1);
  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return result;
};

/**
 *Add contact to list
 * @param {string} name
 * @param {string} email
 * @param {string} phone
 * @returns {object} new contact
 */
const addContact = async (name, email, phone) => {
  const allContacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  allContacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const contactIndex = allContacts.findIndex(contact => contact.id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  const newContact = { id: contactId, ...body };
  allContacts.splice(contactIndex, 1, newContact);
  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
