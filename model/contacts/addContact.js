const path = require("path");
const fs = require("fs").promises;
const contactsPath = path.resolve("");
const { v4 } = require("uuid");

const updateContacts = require("./updateContacts");
const listContacts = require("./listContacts");

async function addContact(data) {
  try {
    const contacts = await listContacts();
    const newContact = { ...data, id: v4() };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
  } catch (error) {
    throw error;
  }
}

module.exports = addContact;
