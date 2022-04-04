const DB = require("../../db/db");

const getCollection = async (db, nameCollection) => {
  const client = await db;
  const collection = await client.db().collection(nameCollection);
  return collection;
};

async function listContacts() {
  const collection = await getCollection(DB, "contacts");
  const contacts = await collection.find({}).toArray();
  console.log(collection);
  return contacts;
}

module.exports = {
  listContacts,
  getCollection,
};
