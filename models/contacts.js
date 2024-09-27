const fs = require("fs/promises");

const path = require("path");

const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const getContacts = async () => {
  const buffer = await fs.readFile(contactsPath);
  return JSON.parse(buffer);
};

const getContactById = async (id) => {
  try {
    const contacts = await getContacts();
    const contact = contacts.find((item) => item.id === id);
    return contact || null;
  } catch (err) {
    console.error(err.message);
  }
};

const removeContact = async (id) => {
  try {
    const contacts = await getContacts();
    const index = contacts.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (err) {
    console.error(err.message);
  }
};

const addContact = async (data) => {
  try {
    const contacts = await getContacts();
    const contact = {
      id: nanoid(),
      ...data,
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
    const contacts = await getContacts();
    const index = contacts.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }
    contacts[index] = { id, ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
