// const fs = require("fs/promises");
// const path = require("path");
const DB = require("../../db/db");

// const contactsPath = path.join(__dirname, "../../db/db.js");

// async function listContacts() {
//   const data = await fs.readFile(contactsPath);
//   const products = JSON.parse(data);
//   return products;
// }

// module.exports = {
//   listContacts,
// };

const getCollection = async (db, nameCollection) => {
  const client = await db;
  const collection = client.db().collection(nameCollection);
  return collection;
};

async function listContacts() {
  const collection = await getCollection(DB, "contacts");
  const contacts = await collection.find({}).toArray();
  return contacts;
}

module.exports = {
  listContacts,
};
