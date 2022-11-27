const listContacts = require("./listContacts");
const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");
const contactPath = path.resolve("./models/contacts.json");

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  const newContacts = [...contacts, newContact];
  await fs.writeFile(contactPath, JSON.stringify(newContacts));
  console.table(
    `New contact: ${name}, email: ${email}, phone: ${phone} was created!`
  );

  return newContact;
};

module.exports = addContact;
