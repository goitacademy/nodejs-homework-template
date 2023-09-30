const path = require('path');
const fs = require('fs/promises');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    throw new Error('Error reading contacts file');
  }
};

const getContactById = async (id) => {
  try {
    const allContacts = await listContacts();
    const result = allContacts.find((item) => item.id === id);
    return result || null;
  } catch (error) {
    throw new Error('Error getting contact by ID');
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
    throw new Error('Error removing contact');
  }
};

const addContact = async (name, email, phone) => {
  try {
    const allContacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    allContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return newContact;
  } catch (error) {
    throw new Error('Error adding contact');
  }
};

const updateContact = async (id, data) => {
  try {
    const allContacts = await listContacts();
    const index = allContacts.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }
    allContacts[index] = { id, ...data };
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return allContacts[index];
  } catch (error) {
    throw new Error('Error updating contact');
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
