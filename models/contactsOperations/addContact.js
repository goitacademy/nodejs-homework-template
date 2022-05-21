const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const contactsDatabase = require("./dbPath");
const listContacts = require("./listContacts");

const addContact = async (body) => {
  const id = await uuidv4();

  const newContact = { id, ...body };

  const sourceContacts = await listContacts();
  const newContacts = [...sourceContacts, newContact];

  await fs.writeFile(contactsDatabase, JSON.stringify(newContacts), "utf8");
  return newContact;
};

module.exports = addContact;
