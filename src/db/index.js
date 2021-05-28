const { MongoClient } = require("mongodb");
require("dotenv").config();

const uriDb = process.env.URI_DB;

const db = MongoClient.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 5,
});

process.on("SIGINT", async () => {
  const client = await db;
  console.log("Database connection successful");
  client.close();
  console.log("Database disconnected");
  process.exit(1);
});

module.exports = db;
