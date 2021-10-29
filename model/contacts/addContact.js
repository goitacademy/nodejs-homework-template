const fs = require("fs/promises");
const readContact = require("./readContact");
const contactsPath = require("./contactsPath");
const crypto = require("crypto");

const id = crypto.randomInt(1, 256);
const addContact = async (data) => {
  const contacts = await readContact();
  const newContact = { id, ...data };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.table(newContact);
};
module.exports = addContact;
