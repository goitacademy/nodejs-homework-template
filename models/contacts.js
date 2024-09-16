const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve('models', 'contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

const getContactById = async (id) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === id);
    return result || null;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

const removeContact = async (id) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const addContact = {
      id: uuidv4(), // Генерация уникального идентификатора с помощью uuid
      ...body,
    };
    contacts.push(addContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return addContact;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

const updateContact = async (id, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }
    contacts[index] = { ...contacts[index], ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
