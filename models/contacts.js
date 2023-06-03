const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

/**
 * Returns an array of contacts read from the contacts file.
 * @returns {Promise<Array<Object>>} A Promise that resolves to an array of contact objects.
 * @throws {Error} If there is an error reading the contacts file.
 */
const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error(`Error reading contacts file: ${error}`);
  }
};

/**
 * Returns the contact with the specified ID.
 * @param {string} contactId - The ID of the contact to retrieve.
 * @returns {Promise<Object>} A Promise that resolves to the contact object with the specified ID.
 * @throws {Error} If the contact with the specified ID is not found.
 */
const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  if (!contact) {
    console.error(`Contact with id=${contactId} not found`);
  }
  return contact;
};

/**
 * Removes the contact with the specified ID from the contacts file.
 * @param {string} contactId - The ID of the contact to remove.
 * @returns {Promise<Object>} A Promise that resolves to the removed contact object.
 * @throws {Error} If the contact with the specified ID is not found.
 * @throws {Error} If there is an error reading or writing the contacts file.
 */
const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    throw new Error("Contact not found");
  }
  const [contact] = contacts.splice(idx, 1);
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  } catch (error) {
    console.error(`Error writing contacts file: ${error}`);
    throw new Error("Error removing contact");
  }
  return contact;
};

/**
 * Adds a new contact to the contacts file.
 * @param {Object} body - The contact data to add.
 * @returns {Promise<Object>} A Promise that resolves to the added contact object.
 */
const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: uuidv4(), ...body };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

/**
 * Updates the contact with the specified ID in the contacts file.
 * @param {string} contactId - The ID of the contact to update.
 * @param {Object} body - The contact data to update.
 * @returns {Promise<Object>} A Promise that resolves to the updated contact object.
 * @throws {Error} If the contact with the specified ID is not found.
 */
const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    console.error(`Contact with id=${contactId} not found`);
  }
  const updatedContact = { ...contacts[idx], ...body, id: contactId };
  contacts.splice(idx, 1, updatedContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
