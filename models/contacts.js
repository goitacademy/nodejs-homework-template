/* eslint-disable no-useless-catch */
const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

async function readContactsFile() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function writeContactsFile(contacts) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    throw new Error(error.message);
  }
}

const listContacts = async () => {
  try {
    return await readContactsFile();
  } catch (error) {
    throw error;
  }
};
const getContactById = async (id) => {
  try {
    const contactId = String(id);
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === contactId);
    return result || null;
  } catch (error) {
    throw error;
  }
};

// const removeContact = async (contactId) => {};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...body,
    };
    contacts.push(newContact);
    await writeContactsFile(contacts);
    return newContact;
  } catch (error) {
    throw error;
  }
};

// const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  // removeContact,
  // updateContact,
};
