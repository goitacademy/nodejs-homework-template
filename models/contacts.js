const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (err) {
    console.error(err);
  }
};

const getById = async ({ contactId }) => {
  try {
    const contacts = await listContacts();
    const index = await contacts.findIndex((item) => item.id === contactId);
    if (index === -1) return null;
    const contact = contacts.find((c) => c.id === contactId);
    return contact;
  } catch (err) {
    console.error(err);
  }
};

const addContact = async (data) => {
  try {
    console.log(data);
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...data,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (err) {
    console.error(err);
  }
};

const removeContact = async (contactId) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
