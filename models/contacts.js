const uuid = require("uuid");

const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.resolve("models", "contacts.json");

const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    return contacts.filter((el) => el.id === contactId);
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.filter((el) => el.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const { name, email, phone } = body;
    const newContact = { id: uuid.v1(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (id, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((el) => el.id === id);
    if (index === -1) {
      return false;
    }
    contacts[index] = { id, ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
