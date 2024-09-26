const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const contactsList = await fs.readFile(contactsPath);
    return JSON.parse(contactsList);
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactsList = await listContacts();
    const result = contactsList.find((contact) => contact.id === contactId);
    return result || null;
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contactsList = await listContacts();
    const index = contactsList.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return null;
    }
    const [result] = contactsList.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async (data) => {
  try {
    const contactsList = await listContacts();
    const newContact = { id: nanoid(), ...data };
    contactsList.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
    return newContact;
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(
      (contact) => contact.id.toString() === contactId
    );
    if (index === -1) {
      return null;
    }
    contacts[index] = { id: nanoid(), ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[index];
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};