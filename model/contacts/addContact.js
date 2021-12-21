const fs = require("fs/promises");
const { randomUUID } = require("crypto");
const readContent = require("./readContent");
const contactsPath = require("./contactsPath");

const addContact = async ({ name, email, phone }) => {
  const contacts = await readContent();
  const newContact = { id: randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));
  return newContact;
};

module.exports = addContact;
