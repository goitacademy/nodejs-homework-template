const DB = require("../../config/db");

const getCollection = async (db, nameCollection) => {
  const client = await db;
  const collection = await client.db().collection(nameCollection);
  return collection;
};

const listContacts = async () => {
  const collection = await getCollection(DB, "contacts");
  const result = await collection.find().toArray();

  return result;
};

module.exports = {
  listContacts,
  getCollection,
};
