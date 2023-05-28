const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "../models/contacts.json"); // Путь к файлу contacts.json

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error("Failed to read contacts data");
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts.find((contact) => contact.id === contactId);
  } catch (error) {
    throw new Error("Failed to read contacts data");
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return true;
  } catch (error) {
    throw new Error("Failed to remove contact");
  }
};

const addContact = async (body) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const newContact = { ...body, id: Math.random().toString(36).substr(2, 9) };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    throw new Error("Failed to add contact");
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index !== -1) {
      const updatedContact = { ...contacts[index], ...body, id: contactId };
      contacts[index] = updatedContact;
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return updatedContact;
    }
    return null;
  } catch (error) {
    throw new Error("Failed to update contact");
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
