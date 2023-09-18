const fs = require("fs/promises");
const path = require("path");

const contactsFilePath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsFilePath, "utf-8");
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
      throw new Error("Contact not found");
    }
    return contact;
  } catch (error) {
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const indexToRemove = contacts.findIndex((c) => c.id === contactId);
    if (indexToRemove === -1) {
      throw new Error("Contact not found");
    }
    contacts.splice(indexToRemove, 1);
    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    throw error;
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: Date.now().toString(), ...body };
    contacts.push(newContact);
    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const indexToUpdate = contacts.findIndex((c) => c.id === contactId);
    if (indexToUpdate === -1) {
      throw new Error("Contact not found");
    }
    contacts[indexToUpdate] = { ...contacts[indexToUpdate], ...body };
    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
    return contacts[indexToUpdate];
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

