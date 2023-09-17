// const fs = require('fs/promises')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

/**
 * Returns list all contacts
 * @returns {Promise<Array>} Array contacts.
 */
const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8');

  console.log(data)

  return JSON.parse(data);
}


/**
 *  Returns contact by its id
 * @param {string} contactId - ID of the contact.
 * @returns {Promise<Object|null>} Object of contact or 'null' if contact is not found.
 */
const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  if (!contact) {
    // throw new Error('Contact not found');
    const error = new Error('Contact not found');
    error.statusCode = 404;
    throw error;
  }
  return contact;
}


/**
 * Deletes a contact by its ID
 * @param {string} contactId - ID of the contact.
 * @returns {Promise<Object|null>} Object of deleted contact or 'null' if contact is not found.
 */
const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    throw new Error('Contact not found');
  }
  const removedContact = contacts.splice(index, 1)[0];
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
}


/**
 * Adds a new contact to the list contacts.
 * @param {string} body - object.
 * @returns {Promise<Object>} The object of the added contact. 
 */
const addContact = async (body) => {
  const contacts = await listContacts();

  const newContact = { id: uuidv4(), ...body };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}


/**
 * 
 * @param {*} contactId 
 * @param {*} body 
 * @returns 
 */
const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((c) => c.id === contactId);
  if (index === -1) {
    throw new Error('Contact not found');
  }
  const updatedContact = { ...contacts[index], ...body };
  contacts[index] = updatedContact;
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
