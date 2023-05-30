const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const getContactById = async (id) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === id);
    return result;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const removeContact = async (id) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((item) => item.id === id);
    if (idx === -1) {
      return null;
    }
    const [result] = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const addContact = async (data) => {
  try {
    const { nanoid } = await import("nanoid");
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...data,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { nanoid } = await import("nanoid");
    const contacts = await listContacts();
    const index = contacts.findIndex(
      (contact) => contact.id.toString() === contactId
    );
    if (index === -1) {
      return null;
    }
    const updatedContact = { ...contacts[index], ...body };
    contacts[index] = updatedContact;
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return updatedContact;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
