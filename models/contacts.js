const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);
  const cotactById = contacts.find((contact) => contact.id === contactId);
  return cotactById;
};

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  const removedContact = contacts.filter((_, index) => index !== idx);
  await fs.writeFile(contactsPath, JSON.stringify(removedContact), "utf8");
  return contacts[idx];
};

const addContact = async (body) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);
  const { name, email, phone } = body;
  const newContact = {
    id: v4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
  return newContact;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
