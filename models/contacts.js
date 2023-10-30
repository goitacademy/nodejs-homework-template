const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, "contacts.json");

const readAndParseContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const listContacts = async () => {
  const contacts = await readAndParseContacts();
  return contacts;
};

const getContactById = async (contactId) => {
  const data = await readAndParseContacts();
  const contact = data.find((contact) => contact.id === contactId);
  if (!contact) {
    return;
  }
  return contact || null;
};

const removeContact = async (contactId) => {
  const data = await readAndParseContacts();
  const index = data.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const deletedContact = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return deletedContact;
};

const addContact = async ({ name, email, phone }) => {
  const data = await readAndParseContacts();
  const isExist = data.find(
    (contact) =>
      contact.name === name &&
      contact.email === email &&
      contact.phone === phone
  );
  if (isExist) {
    console.warn("Contact with such credentials already exists");
    return;
  }
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const data = await readAndParseContacts();
  const index = data.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  
  const updatedContact = { ...data[index], ...body };
  data.splice(index, 1, updatedContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
