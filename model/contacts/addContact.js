const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const { readContent, contactPath } = require("./readContent");

const addContact = async ({ name, email, phone }) => {
  const contacts = await readContent();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(path.join(contactPath), JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = addContact;
