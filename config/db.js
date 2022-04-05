const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.URI_DB;
const db = MongoClient.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

process.on("SIGINT", async () => {
  console.log("Disconnect from db");
  const client = await db;
  await client.close();
  process.exit(1);
});

const getCollection = async (db, nameCollection) => {
  const client = await db;
  const collection = client.db().collection(nameCollection);
  return collection;
};

module.exports = { getCollection };
module.exports = db;
