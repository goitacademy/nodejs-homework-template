// const DB = require("../config/db");

// const getCollection = async (db, nameCollection) => {
//   const client = await db;
//   const collection = await client.db().collection(nameCollection);
//   return collection;
// };

const Contact = require("../models/contacts");
const listContacts = async () => {
  const result = await Contact.find();
  return result;
};

module.exports = {
  listContacts,
};
