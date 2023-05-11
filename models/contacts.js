const fs = require('fs/promises');

const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

/**
 * Get the list of all contacts in database
 * @returns {array} - list of objects of contacts
 */
const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

/**
 * Get one contact according to its id
 * @param {string} contactId - id of contact
 * @returns {object} - contact or null, if no contact with such id in database
 */
const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(({ id }) => id === contactId);
  return result || null;
};

/**
 * Remove contact from database by its id
 * @param {string} contactId - id of contact
 * @returns {object} - deleted contact or null, if no contact with such id in database
 */
const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) return null;
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

/**
 * Add new contact to database
 * @param {object} body - contact`s name, email, phone number
 * @returns {object} - new contact
 */
const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), ...body };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

/**
 *
 * @param {string} contactId - id of contact
 * @param {object} body - contact`s name, email, phone number
 * @returns
 */
const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) return null;
  contacts[index] = { id: contactId, ...body };
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
