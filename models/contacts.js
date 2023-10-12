const { json } = require("express/lib/response");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.resolve(__dirname, "contacts.json");

const contactsUpdate = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const resolve = contacts.find((contact) => contact.id === contactId);
  return resolve || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  const resolve = contacts.splice(index, 1);
  await contactsUpdate(contacts);
  return resolve || null;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await contactsUpdate(contacts);
  return newContact;
};

const updateContact = async (id, name, email, phone) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = {
    id,
    name: name ? name : contacts[index].name,
    email: email ? email : contacts[index].email,
    phone: phone ? phone : contacts[index].phone,
  };
  await contactsUpdate(contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
