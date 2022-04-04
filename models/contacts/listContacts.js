const DB = require("../../db/db");

const getCollection = async (db, nameCollection) => {
  const client = await db;
  const collection = await client.db().collection(nameCollection);
  return collection;
};

const listContacts = async () => {
  const collection = await getCollection(DB, "contacts");
  const result = await collection.find().toArray();
  console.log(result);
  return result;
};

module.exports = {
  listContacts,
  getCollection,
};
