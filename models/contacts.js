const fs = require("node:fs/promises");
const path = require("node:path");
const { v4: uuidv4 } = require("uuid");

const CONTACTS_PATH = path.join(__dirname, "contacts.json");

/**
 * @author Yuliya Solovenuk
 * @returns {Array}
 */
const listContacts = async () => {
  const jsonContacts = await fs.readFile(CONTACTS_PATH);
  const contacts = JSON.parse(jsonContacts);
  return contacts;
};

/**
 * @author Yuliya Solovenuk
 * @param {string}
 * @returns {object}
 */
const getContactById = async (id) => {
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === id);

  return contactById || null;
};

/**
 * @author Yuliya Solovenuk
 * @param {object}
 * @returns {object}
 */
const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    ...body,
  };

  contacts.push(newContact);
  await fs.writeFile(CONTACTS_PATH, JSON.stringify(contacts));

  return newContact;
};

/**
 * @author Yuliya Solovenuk
 * @param {string}
 * @returns {object}
 */
const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);

  if (index === -1) {
    return null;
  }

  const deletedContact = contacts.splice(index, 1)[0];
  await fs.writeFile(CONTACTS_PATH, JSON.stringify(contacts));

  return deletedContact;
};

/**
 * @author Yuliya Solovenuk
 * @param {string}
 * @param {object}
 * @returns {object}
 */
const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);

  if (index === -1) {
    return null;
  }

  contacts[index] = { id: id, ...body };

  await fs.writeFile(CONTACTS_PATH, JSON.stringify(contacts));

  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
