const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const searchedContact = contacts.find((contact) => contact.id === contactId);

  console.log(searchedContact);
  return searchedContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  console.table(contacts);
  const newContacts = contacts.filter(
    (contact) => contact.id !== String(contactId)
  );
  if (contacts.length === newContacts.length) {
    return null;
  }
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return newContacts;
};

const addContact = async (name, email, phone) => {
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, name, email, phone) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((item) => item.id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  const updatedcontact = { name, email, phone };
  contacts[contactIndex] = { id: contactId, ...updatedcontact };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
