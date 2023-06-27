const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await fs.readFile(contactsPath);
  const parsedContacts = JSON.parse(contacts);
  return parsedContacts.find((contact) => contact.id === contactId);
};

const addContact = async (name, email, phone) => {
  const contacts = await fs.readFile(contactsPath);
  const parsedContacts = JSON.parse(contacts);
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const updatedContacts = [...parsedContacts, newContact];

  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await fs.readFile(contactsPath);
  const parsedContacts = JSON.parse(contacts);
  const filteredContacts = parsedContacts.filter(
    (contact) => contact.id !== contactId
  );
  fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
  return filteredContacts;
};

const updateContact = async (contactId, updatedContact) => {
  const contacts = await fs.readFile(contactsPath);
  const parsedContacts = JSON.parse(contacts);
  const contactIndex = parsedContacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex !== -1) {
    parsedContacts[contactIndex] = {
      ...parsedContacts[contactIndex],
      ...updatedContact,
    };
    await fs.writeFile(contactsPath, JSON.stringify(parsedContacts));
    return parsedContacts[contactIndex];
  }
  return null;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
