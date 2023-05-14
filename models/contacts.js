const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    error.status = 500;
    error.message = "Server error";
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await listContacts();
    return data.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    error.status = 500;
    error.message = "Server error";
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) return null;
    const deletedContact = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return deletedContact;
  } catch (error) {
    error.status = 500;
    error.message = "Server error";
    throw error;
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), ...body };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    error.status = 500;
    error.message = "Server error";
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
      return null;
    }

    const updatedContact = { ...contacts[index], ...body };
    contacts[index] = updatedContact;
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return updatedContact;
  } catch (error) {
    error.status = 500;
    error.message = "Server error";
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
