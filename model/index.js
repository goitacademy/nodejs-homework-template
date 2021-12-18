const fs = require("fs/promises");
const { v4 } = require("uuid");

const contactsPath = require("./contactsPath");
const updateContacts = require("./updateContacts");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    return result;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await listContacts();
    const result = data.find((item) => item.id === contactId);
    if (!result) {
      return null;
    }
    return result;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await listContacts();
    const idx = data.findIndex((item) => item.id === contactId);
    if (idx === -1) {
      return null;
    }
    const newContacts = data.filter((_, index) => index !== idx);
    await updateContacts(newContacts);
    return data[idx];
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const newObj = { id: v4(), ...name, ...email, ...phone };
    const list = await listContacts();
    const newList = [...list, newObj];
    await updateContacts(newList);
    return newObj;
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (contactId, name, email, phone) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((item) => item.id === contactId);
    if (idx === -1) {
      return null;
    }
    contacts[idx] = { contactId, name, email, phone };
    await updateContacts(contacts);
    return contacts[idx];
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
