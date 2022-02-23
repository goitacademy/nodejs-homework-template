const { randomUUID } = require("crypto");
const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "../../db/contacts.json");
const listContacts = require("./listContacts");
const addContact = async (body) => {
  const contact = await listContacts.listContacts();
  const newContact = {
    id: randomUUID(),
    ...body,
  };
  const arrNew = [...contact, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(arrNew));
  return arrNew;
};

module.exports = {
  addContact,
};
