const fs = require("fs/promises");
const path = require("path");

const { v4: uuidv4 } = require("uuid");

const pathContact = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(pathContact);
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (id) => {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find((item) => item.id === id);

    return contactById || null;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    if (index === -1) {
      return null;
    }
    const deletedContact = contacts.splice(index, 1);
    await fs.writeFile(pathContact, JSON.stringify(contacts, null, 2));
    return deletedContact;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: uuidv4(),
      ...body,
    };
    contacts.push(newContact);
    await fs.writeFile(pathContact, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (id, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }
    contacts[index] = { id, ...body };
    await fs.writeFile(pathContact, JSON.stringify(contacts, null, 2));
    return contacts[index];
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
