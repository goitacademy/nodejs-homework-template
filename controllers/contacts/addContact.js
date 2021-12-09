const listContacts = require("./listContacts")
const { v4 } = require("uuid");

const fs = require('fs/promises')
const path = require("path");
const contactsPath = path.join(__dirname, "../../model/contacts.json");



async function addContact({name, email, phone}) {
    const contacts = await listContacts();
    const newContact = { id: v4(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  }

  module.exports = addContact