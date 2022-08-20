const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const filePath = path.resolve(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(filePath);

    return JSON.parse(contacts);
  } catch (err) {
    console.log(err);
  }
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const foundContact = contacts.find(contact => contact.id === contactId);
  if (!foundContact) {
    return null;
  }

  return foundContact;
};

const removeContact = async contactId => {
  const contact = await getContactById(contactId);
  if (!contact) {
    return;
  }
  const contacts = await listContacts();
  const filteredContacts = contacts.filter(contact => contact.id !== contactId);

  await fs.writeFile(filePath, JSON.stringify(filteredContacts));
  return filteredContacts;
};

const addContact = async body => {
  const contacts = await listContacts();
  const { name, email, phone } = body;
  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(filePath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const { name, email, phone } = body;
  const idx = contacts.findIndex(contact => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id: contactId, name, email, phone };
  await fs.writeFile(filePath, JSON.stringify(contacts));
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
