const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contatsPath = path.resolve("./models/contacts.json");
const updatecontacts = async (contacts) => {
  await fs.writeFile(contatsPath, JSON.stringify(contacts));
};

const listContacts = async () => {
  const result = await fs.readFile(contatsPath);
  const contacts = JSON.parse(result);
  // const contacts = fs.gt();
  // console.log(contacts);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  const newContacts = contacts.filter((_, index) => index !== idx);
  await updatecontacts(newContacts);
  console.log(contacts[idx]);
  return contacts[idx];
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), ...body };
  const newContacts = [...contacts, newContact];
  await updatecontacts(newContacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { contactId, ...body };
  await updatecontacts(contacts);
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
