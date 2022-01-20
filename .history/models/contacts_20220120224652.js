const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname,"contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (e) {
    console.log(e.message);
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find(({ id }) => id === contactId) || null;
    if (!result) {
      return null;
    }
    return result;
  } catch (e) {
    console.log(e.message);
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(({ id }) => id === contactId);

    if (idx === -1) {
      return null;
    }

    const removedContact = contacts[idx];
    contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact;
  } catch (e) {
    console.log(e.message);
  }
}

const addContact = async (body) => {
  try {
    const newContact = { id: v4(), name, email, phone };
    const contacts = await listContacts();

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (e) {
    console.log(e.message);
  }
}

// const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  // updateContact,
}
