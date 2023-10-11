const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

/**
 * Return contacts array
 */
const getAllContacts = async () => {
  return JSON.parse(await fs.readFile(contactsPath));
};

/**
 * Return contact by Id
 * @param {string} contactId
 */
const getContactById = async contactId => {
  const contact = (await getAllContacts()).find(
    contact => contact.id === contactId
  );
  return contact || null;
};

/**
 *
 * @param {object} body
 * @returns new added Contact
 */
const addContact = async ({ name, email, phone }) => {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const contacts = await getAllContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

/**
 *
 * @param {string} contactId
 * @returns deleted contact
 */
const removeContactById = async contactId => {
  const contacts = await getAllContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

/**
 * Update contact info
 * @param {string} contactId
 * @param {object} body
 * @returns updated contact
 */
const updateContactById = async (contactId, body) => {
  const contacts = await getAllContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }
  for (const key in contacts[index]) {
    if (Object.hasOwn(body, key)) {
      contacts[index][key] = body[key];
    }
  }
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContactById,
};
