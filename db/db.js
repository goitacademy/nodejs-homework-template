const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = process.env.URI_DB;

const db = MongoClient.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

process.on("SIGINT", async () => {
  console.log("Disconnect from db");
  const client = await db;
  client.close();
  process.exit(1);
});

module.exports = db;
