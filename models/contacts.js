const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

// Path to the contacts data file
const contactsPath = path.join(__dirname, 'contacts.json');

/**
 * Writes an array of contacts to the contacts data file.
 * @param {Array} contacts - An array of contact objects.
 * @throws {Error} If the write operation fails.
 */
async function writeToFile(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    throw new Error(`Failed to write to file: ${err.message}`);
  }
}

/**
 * Reads the contacts data file and returns the parsed JSON data.
 * @returns {Array} An array of contact objects.
 * @throws {Error} If the read operation fails.
 */
async function readFromFile(filePath) {
  try {
    const data = await fs.readFile(filePath);
    return JSON.parse(data);
  } catch (err) {
    throw new Error(`Failed to read from file: ${err.message}`);
  }
}

/**
 * Returns the list of all contacts.
 * @returns {Array} An array of contact objects.
 */
async function listContacts() {
  return await readFromFile(contactsPath);
}

/**
 * Returns the contact object with the specified ID, or null if no such contact exists.
 * @param {string} contactId - The ID of the contact to retrieve.
 * @returns {Object|null} The contact object with the specified ID, or null if no such contact exists.
 */
async function getContactById(contactId) {
  const contacts = await readFromFile(contactsPath);
  const contact = contacts.find((contact) => contact.id === contactId);

  if (!contact) throw new Error();

  return contact;
}

/**
 * Removes the contact with the specified ID from the contacts list.
 * @param {string} contactId - The ID of the contact to remove.
 * @returns {Object|null} The removed contact object, or null if no such contact exists.
 */
async function removeContact(contactId) {
  const contacts = await readFromFile(contactsPath);
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);
  await writeToFile(contactsPath, contacts);

  return result;
}

/**
 * Adds a new contact to the contacts list.
 * @param {Object} body - The request body containing the new contact data.
 * @returns {Object} The newly added contact object.
 * @throws {Error} If the name, email, or phone properties are missing from the request body.
 */
async function addContact({ name, email, phone }) {
  const contact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const contacts = await readFromFile(contactsPath);
  contacts.push(contact);
  await writeToFile(contactsPath, contacts);

  return contact;
}

/**
 * Updates the contact with the specified ID with the provided data.
 * @param {string} contactId - The ID of the contact to update.
 * @param {Object} body - The request body containing the updated contact data.
 * @returns {Object|null} The updated contact object, or null if no such contact exists.
 */
async function updateContact(contactId, { name, email, phone }) {
  const contacts = await readFromFile(contactsPath);
  const index = contacts.findIndex((contact) => contact.id === contactId);

  const updatedContact = { ...contacts[index], name, email, phone };
  contacts.splice(index, 1, updatedContact);

  await writeToFile(contactsPath, contacts);

  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
