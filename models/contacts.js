const fs = require('fs/promises');
const path = require("path");
const shortid = require("shortid");
const contactsPath = path.resolve("./models/contacts.json");

const readContacts = () => fs.readFile(contactsPath, "utf8");

const displayContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");

const listContacts = async () => {
  const contacts = await readContacts();
  return JSON.parse(contacts);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const gottenContact = contacts.find((contact) => contact.id === contactId);
  return gottenContact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const deletedContact = contacts.filter((contact) => contact.id !== contactId);
  await displayContacts(deletedContact);
  return deletedContact;
}

const addContact = async (body) => {
  const newUser = {
    id: shortid.generate(),
    ...body,
  };
  const contacts = await listContacts();
  contacts.push(newUser);
  await displayContacts(contacts);
  return newUser;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const { name, email, phone } = body;
  contacts.forEach((element) => {
    if (element.id === contactId) {
      element.name = name;
      element.email = email;
      element.phone = phone;
    }
  });
  await displayContacts(contacts);
  return body;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}