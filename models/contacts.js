const fs = require('fs/promises');
const uuid = require('uuid').v4;
const path = require('path');
const contactsPath = path.join(__dirname, 'contacts.json');

/**
 *
 * @returns
 */
const listContacts = async () => {
  const list = await fs.readFile(contactsPath);

  return JSON.parse(list);
};

/**
 *
 * @param {*} body
 * @returns
 */
const addContact = async (body) => {
  const data = await listContacts();

  const newContact = {
    id: uuid(),
    ...body,
  };

  data.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

  return newContact;
};

/**
 *
 * @param {*} contactId
 * @returns
 */
const getContactById = async (contactId) => {
  const data = await listContacts();

  const contact = data.find((item) => item.id === contactId);

  return contact || null;
};

/**
 *
 * @param {*} contactId
 * @returns
 */
const removeContact = async (contactId) => {
  const data = await listContacts();

  const index = data.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }

  const deletedContact = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

  return deletedContact;
};

/**
 *
 * @param {*} contactId
 * @param {*} body
 * @returns
 */
const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }

  data[index] = { id: contactId, ...body };

  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

  return data[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
