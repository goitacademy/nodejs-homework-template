const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid/async");

const contactsPath = path.join(__dirname, "../models/contacts.json");

const update = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

module.exports = { listContacts };
