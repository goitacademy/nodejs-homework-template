const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.resolve(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const rawData = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(rawData);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const getContactsList = await listContacts();
    return getContactsList.find(
      (contact) => String(contact.id) === String(contactId)
    );
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const getContactsList = await listContacts();
    const newContactsList = getContactsList.filter(
      (contact) => String(contact.id) !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(newContactsList, null, 3));
    return getContactsList.find(
      (item) => String(item.id) === String(contactId)
    );
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const id = crypto.randomUUID();
    const getContactsList = await listContacts();
    const newContact = { id, ...body };
    getContactsList.push(newContact);
    console.log(getContactsList);
    await fs.writeFile(contactsPath, JSON.stringify(getContactsList, null, 4));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const getContactsList = await listContacts();
    const idx = getContactsList.findIndex(
      (contact) => contact.id === contactId
    );
    if (idx === -1) {
      return null;
    }
    getContactsList[idx] = { contactId, ...body };
    await fs.writeFile(contactsPath, JSON.stringify(getContactsList, null, 2));
    return getContactsList[idx];
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
