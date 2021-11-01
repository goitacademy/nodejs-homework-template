const { v4 } = require("uuid");
const fs = require("fs/promises");

const refreshContacts = require("./refreshContacts");
const listContacts = require("./listContacts");

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await refreshContacts(contacts);
  return newContact;
};

module.exports = addContact;
