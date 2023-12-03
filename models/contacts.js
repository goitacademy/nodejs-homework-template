const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const allContacts = await listContacts();
    const contactById = allContacts.find((item) => item.id === contactId);
    return contactById || null;
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (id) => {
  try {
    const allContacts = await listContacts();
    const index = allContacts.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }
    const [result] = allContacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async (body) => {
  try {
    const allContacts = await listContacts();
    const newContact = { id: uuidv4(), ...body };
    allContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return newContact;
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (id, body) => {
  try {
    const allContacts = await listContacts();
    const index = allContacts.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }
    allContacts[index] = { id, ...body };
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return allContacts[index];
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
