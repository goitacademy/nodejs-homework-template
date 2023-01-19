const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "..", "data", "contacts.json");
const getContacts = require("./getContacts");
const { v4: uID } = require("uuid");
const createError = require("http-errors");

const addContact = async ({ name, email, phone }) => {
  const contacts = await getContacts();
  const newContact = { id: uID(), name, email, phone };

  if (
    contacts.some(
      (contact) =>
        contact.name === name.trim() && contact.email === email.trim()
    )
  ) {
    throw createError(
      409,
      `The contact name: ${name} with email: ${email} already exist, add someone new please`
    );
  }

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));
  return newContact;
};

module.exports = addContact;
