const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "../db/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((c) => c.id === contactId);
    if (!contact) {
      throw new Error(`Contact with id=${contactId} not found`);
    }
    return contact;
  } catch (error) {
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((c) => c.id === contactId);
    if (index === -1) {
      throw new Error(`Contact with id=${contactId} not found`);
    }
    const newContacts = contacts.filter((c) => c.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  } catch (error) {
    throw error;
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = { ...body, id: Date.now().toString() };
    const newContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return newContact;
  } catch (error) {
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((c) => c.id === contactId);
    if (index === -1) {
      throw new Error(`Contact with id=${contactId} not found`);
    }
    const updatedContact = { ...contacts[index], ...body, id: contactId };
    const newContacts = [
      ...contacts.slice(0, index),
      updatedContact,
      ...contacts.slice(index + 1),
    ];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return updatedContact;
  } catch (error) {
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
