const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "../contacts.json");

const readData = async () => {
  const result = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(result);
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await readData();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = addContact;
