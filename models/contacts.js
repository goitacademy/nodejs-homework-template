const path = require("path");
const { nanoid } = require("nanoid");

const { loadFile, saveFile } = require("../utils/jsonFiles");
const { validationForUpdatingContact } = require("../utils/validation");
const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  try {
    const contacts = await loadFile(contactsPath);
    return contacts;
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => id === contactId);
    return contact;
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = await getContactById(contactId);
    const updatedContacts = contacts.filter(({ id }) => id !== contactId);
    await saveFile(contactsPath, updatedContacts);
    return contact;
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...body,
    };
    const updatedContacts = [...contacts, newContact];
    await saveFile(contactsPath, updatedContacts);
    return newContact;
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => id === contactId);
    if (index === -1) return "not-found";
    if (validationForUpdatingContact(body).error) return "bad-request";

    contacts[index] = { ...contacts[index], ...body };
    await saveFile(contactsPath, contacts);
    return contacts[index];
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
