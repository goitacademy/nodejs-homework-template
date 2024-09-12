const { v4: uuidv4 } = require("uuid");
const path = require("node:path");

const fs = require("node:fs/promises");
const { error } = require("node:console");

const DB_PATH = path.join(__dirname, "./contacts.json");
console.log(DB_PATH);


const uniqueId = uuidv4();

const listContacts = async () => {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    console.log(data);
    return JSON.parse(data);
  } catch {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact;
  } catch {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const IndexContact = contacts.findIndex(
      (contact) => contact.id === contactId
    );

    contacts.splice(IndexContact, 1);
    await fs.writeFile(DB_PATH, JSON.stringify(contacts, null, 2));
    return contacts[IndexContact];
  } catch {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: uniqueId,
      ...body,
    };

    contacts.push(newContact);
    await fs.writeFile(DB_PATH, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const IndexContact = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    const updateContact = { ...contacts[IndexContact], ...body };
    contacts[IndexContact] = updateContact;
    await fs.writeFile(DB_PATH, JSON.stringify(contacts, null, 2));
    return updateContact;
  } catch {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
