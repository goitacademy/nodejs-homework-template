const fs = require("fs/promises");
const { v4 } = require("uuid");

const contactsPath = require("./contactsPath");

const listContacts = require("./listContacts");

const addContact = async (body) => {
  const allContacts = await listContacts();
  const newContact = { id: v4(), ...body };
  const newObject = [...allContacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newObject));
  return newContact;
};

module.exports = addContact;
