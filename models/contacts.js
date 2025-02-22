const { v4: uuidv4 } = require("uuid");
const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (err) {
    console.error("Error reading contacts file in listContacts:", err);
    throw err;
  }
};

const getContactById = async (contactId) => {
  let contacts;
  try {
    const data = await fs.readFile(contactsPath);
    contacts = JSON.parse(data);
  } catch (err) {
    console.error("Error reading contacts file in getContactById:", err);
    throw err;
  }

  const contact = contacts.filter((contact) => contact.id === contactId);
  if (contact.length === 0) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {
  let contacts;

  try {
    contacts = await listContacts();
  } catch (err) {
    console.error("Error reading contacts file in removeContact:", err);
    throw err;
  }

  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  contacts.splice(index, 1);

  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (err) {
    console.error("Error writing to contacts file in removeContact:", err);
    throw err;
  }

  return contacts;
};

const addContact = async (body) => {
  let contacts;

  try {
    contacts = await listContacts();
  } catch (err) {
    console.error("Error reading contacts file in addContact:", err);
    throw err;
  }

  const newContact = {
    id: uuidv4(),
    ...body,
};

contacts.push(newContact);

  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (err) {
    console.error("Error writing to contacts file in addContact:", err);
    throw err;
  }
};

const updateContact = async (contactId, body) => {
  let contacts;

  try {
    contacts = await listContacts();
  } catch (err) {
    console.error("Error reading contacts file in updateContact:", err);
    throw err;
  }

  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  const newContact = {
    id: uuidv4(),
    ...body,
  };

  contacts.splice(index, 1, newContact);

  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (err) {
    console.error("Error writing to contacts file in updateContact:", err);
    throw err;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};