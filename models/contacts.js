const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.join('models', 'contacts.json');

/**
 * read all contacts
 * @returns {Array}
 */
const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
};

/**
 * get contact by contact ID
 * @param {String } - id
 * @returns {Object | Null }
 */
const getContactById = async id => {
  const data = await listContacts();
  const contactById = data.find(contact => contact.id === id);
  return contactById ? contactById : null;
};

/**
 * add contact to db
 * @param {Object} - body
 * @returns {Object}
 */
const addContact = async body => {
  const data = await listContacts();
  data.push(body);
  await fs.writeFile(contactsPath, JSON.stringify(data));
  return body;
};

/**
 * delete contact by contact ID
 * @param {String} - id
 * @returns {Object | Null }
 */
const removeContact = async id => {
  const data = await listContacts();
  const contactToRemove = data.find(contact => contact.id === id);
  if (!contactToRemove) {
    return null;
  }

  const filteredContacts = data.filter(contact => contact.id !== id);
  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
  return contactToRemove;
};

/**
 * update contact by contact ID
 * @param {String} - id,
 * @param {Object} - body
 * @returns {Object | Null }
 */
const updateContact = async (id, body) => {
  const data = await listContacts();
  const contactToUpdate = data.find(contact => contact.id === id);
  if (!contactToUpdate) {
    return null;
  }

  const { name, email, phone } = body;
  contactToUpdate.name = name;
  contactToUpdate.email = email;
  contactToUpdate.phone = phone;

  await fs.writeFile(contactsPath, JSON.stringify(data));
  return contactToUpdate;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
