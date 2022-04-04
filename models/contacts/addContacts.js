const { getCollection } = require("./listContacts");
const DB = require("../../db/db");
const addContact = async (body) => {
  const collection = await getCollection(DB, "contacts");
  const newContact = {
    ...body,
  };
  const result = await collection.insertOne(newContact);
  return result;
};

module.exports = {
  addContact,
};
