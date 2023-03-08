const fs = require("fs/promises");
const path = require("path");
const uuid = require("uuid").v4;

const contactsPath = path.resolve(__dirname, "../models/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const getContacts = await listContacts();
    const data = getContacts.find((item) => item.id === contactId);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const getContacts = await listContacts();
    const newContactsList = getContacts.filter((item) => item.id !== contactId);
    const result = await fs.writeFile(
      contactsPath,
      JSON.stringify(newContactsList)
    );
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const getContacts = await listContacts();
    const newContact = {
      id: uuid(),
      ...body,
    };
    getContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(getContacts));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const getContacts = await listContacts();
    const index = getContacts.findIndex((item) => item.id === contactId);
    if (index === -1) {
      return null;
    }
    const updatedContact = { ...getContacts[index], ...body };
    getContacts[index] = updatedContact;
    await fs.writeFile(contactsPath, JSON.stringify(getContacts));
    return updatedContact;
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
