const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (id) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((c) => c.id === id);
    return contact || null;
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (id) => {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex((c) => c.id === id);
    if (contactIndex === -1) {
      return null;
    }
    const [removedContact] = contacts.splice(contactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact;
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...body,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (id, body) => {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex((c) => c.id === id);
    if (contactIndex === -1) {
      return null;
    }
    contacts[contactIndex] = { id, ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[contactIndex];
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
