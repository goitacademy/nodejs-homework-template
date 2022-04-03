// const { randomUUID } = require("crypto");
// const fs = require("fs/promises");
// const path = require("path");
// const contactsPath = path.join(__dirname, "../../db/contacts.json");
// const listContacts = require("./listContacts");
const { getCollection } = require("./listContacts");
const DB = require("../../db/db");
const addContact = async (body) => {
  const collection = await getCollection(DB, "contacts");
  const newContact = {
    ...body,
  };

  // const arrNew = [...contact, newContact];
  // await fs.writeFile(contactsPath, JSON.stringify(arrNew));
  const result = await collection.insertOne(newContact);
  return result;
};

module.exports = {
  addContact,
};
