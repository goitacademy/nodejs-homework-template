const fs = require("fs/promises");
// import * as fs from "fs/promises";
// import { nanoid } from "nanoid";
const { v4: uuidv4 } = require("uuid");

const listContacts = async () => {
  const contactsJson = await fs.readFile("./models/contacts.json", "utf8");
  return JSON.parse(contactsJson);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId.toString());
};

const removeContact = async (contactId) => {};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  contacts.push({ id: uuidv4(), name, email, phone });
  await fs.writeFile("./models/contacts.json", JSON.stringify(contacts));
  return contacts;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
