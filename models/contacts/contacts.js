const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, '../../db/contacts.json');

const readFile = async () => JSON.parse(await fs.readFile(contactsPath, 'utf-8'));

const writeFile = async (data) => await fs.writeFile(contactsPath, JSON.stringify(data, null, '\t'));

const formatToStructure = async ({ id, name, email, phone }) => ({ id, name, email, phone });

/**
 * Retrieving all contacts from a data array.
 * @returns {[{}]} array objects.
 */
const listContacts = async () => await readFile();

/**
 * Retrieving a contact by "Id" from a data array.
 * @param {string} contactId id of the element to be found.
 * @returns {{id : string, name : string, email : string, phone : string} | null} object or null.
 */
const getById = async (contactId) => {
  const contacts = await readFile();
  const result = contacts.find(({ id }) => id === contactId);
  return result || null;
}

/**
 * Adding a new contact to an data array.
 * @param {object} body object from the fields: name, email, phone.
 * @returns {{id : string, name : string, email : string, phone : string}} new object that is added to the data array.
 */
const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await readFile();
  const newContactId = (Number(contacts[contacts.length - 1].id) + 1).toString();
  const newContact = {
    id: newContactId,
    name,
    email,
    phone,
  }
  await writeFile([...contacts, newContact]);
  return newContact;
}

/**
 * Updating contact by "Id" in data array.
 * @param {string} contactId id of the element to be update.
 * @param {object} body object from the fields: name, email, phone.
 * @returns {{id : string, name : string, email : string, phone : string} | null} updated object or null.
 */
const updateContact = async (contactId, body) => {
  const contacts = await readFile();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  const contact = { ...contacts[index], ...body };
  contacts[index] = await formatToStructure(contact);

  await writeFile(contacts);
  return contacts[index];
}

/**
 * Removing contact by 'Id' from data array.
 * @param {string} contactId id of the element to be deleted.
 * @returns {{id : string, name : string, email : string, phone : string} | null} deleted object or null
 */
const removeContact = async (contactId) => {
  const contacts = await readFile();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);

  await writeFile(contacts);
  return result;
}

module.exports = {
  listContacts,
  getById,
  addContact,
  updateContact,
  removeContact,
}
