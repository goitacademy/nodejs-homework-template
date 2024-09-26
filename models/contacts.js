const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const buffer = await fs.readFile(contactsPath);
    return JSON.parse(buffer);
  } catch (err) {
    console.error(err.message);
  }
};

const getContactById = async (id) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((item) => item.id === id);
    return contact || null;
  } catch (err) {
    console.error(err.message);
  }
};

const removeContact = async (id) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }
    const [contact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contact;
  } catch (err) {
    console.error(err.message);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const contact = {
      id: nanoid(),
      ...body,
    };
    contacts.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contact || null;
  } catch (err) {
    console.error(err.message);
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
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
