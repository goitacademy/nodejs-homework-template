// const fs = require('fs/promises')

const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading or parsing file:", error);
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact;
  } catch (error) {
    console.error("Error reading or parsing file:", error);
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contact = contacts.find((contact) => contact.id === contactId);
    const newContacts = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return contact;
  } catch (error) {
    console.error("Error reading or parsing file:", error);
    throw error;
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const id = contacts.length + 1;
    const contactToAdd = {
      id: String(id),
      name,
      email,
      phone,
    };
    contacts.push(contactToAdd);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  } catch (error) {
    console.error("Error reading or parsing file:", error);
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone } = body;
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contact = contacts.find((contact) => contact.id === contactId);
    if (contact) {
      contact.name = name;
      contact.email = email;
      contact.phone = phone;
    }
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contact;
  } catch (error) {
    console.error("Error reading or parsing file:", error);
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
