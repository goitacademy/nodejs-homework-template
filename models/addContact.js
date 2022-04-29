const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const { contactsPath } = require("../helpers/index");
const listContacts = require("./listContacts");

const addContact = async (body) => {
  const { name, email, phone } = body;
  const newContact = { id: nanoid(), name, email, phone };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

module.exports = addContact;
