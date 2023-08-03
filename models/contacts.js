const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsFilePath = path.join(__dirname, "contacts.json");

const readContactsFile = async () => {
  try {
    const buffer = await fs.readFile(contactsFilePath);
    return JSON.parse(buffer);
  } catch (err) {
    console.error(err.message);
    return [];
  }
};

const getContacts = async () => {
  return await readContactsFile();
};

const getContactById = async (id) => {
  try {
    const contacts = await readContactsFile();
    const contact = contacts.find((item) => item.id === id);
    return contact || null;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

const removeContact = async (id) => {
  try {
    const contacts = await readContactsFile();
    const index = contacts.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

const addContact = async (data) => {
  try {
    const contacts = await readContactsFile();
    const contact = {
      id: nanoid(),
      ...data,
    };
    contacts.push(contact);
    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
    return contact || null;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

const updateContact = async (id, body) => {
  try {
    const contacts = await readContactsFile();
    const index = contacts.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }
    contacts[index] = { id, ...body };
    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
