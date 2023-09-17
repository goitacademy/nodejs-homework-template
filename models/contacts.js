const fs = require("fs/promises");
const crypto = require("crypto");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

/**
 * The function `listContacts` reads a file containing contacts and returns them as a parsed JSON
 * object.
 * @returns The function `listContacts` returns a promise that resolves to an array of contacts.
 */

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

/**
 * The function `getContactById` retrieves a contact object from a list of contacts based on the
 * provided contactId.
 * @param contactId - The `contactId` parameter is the unique identifier of the contact that we want to
 * retrieve from the list of contacts.
 * @returns The function `getContactById` returns the contact object with the specified `contactId` if
 * it exists in the list of contacts. If the contact is not found, it returns `null`.
 */

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
};

/**
 * The `removeContact` function removes a contact from a list of contacts and updates the contacts
 * file.
 * @param contactId - The `contactId` parameter is the unique identifier of the contact that needs to
 * be removed from the list of contacts.
 * @returns the deleted contact.
 */

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [deletedTask] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deletedTask;
};

/**
 * The addContact function adds a new contact to a list of contacts and saves it to a file.
 * @param body - The `body` parameter is an object that contains the data for the new contact. It
 * includes properties as `name`, `email`, `phone`.
 * @returns The function `addContact` is returning the newly created contact object.
 */

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: crypto.randomUUID(), ...body };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

/**
 * The function `updateContact` updates a contact in a list of contacts by finding the contact with the
 * specified ID, replacing its properties with the new values provided in the `body` parameter, and
 * then saving the updated list to a file.
 * @param contactId - The `contactId` parameter is the unique identifier of the contact that needs to
 * be updated. It is used to find the index of the contact in the `contacts` array.
 * @param body - The `body` parameter is an object that contains the updated information for the
 * contact. It includes properties as `name`, `email`, `phone`.
 * @returns the updated contact object if it exists in the contacts array, otherwise it returns null.
 */

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  const updatedContact = contacts[index];
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};