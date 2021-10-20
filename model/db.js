const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.URI_DB;

const db = MongoClient.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

process.on("SIGINT", async () => {
  const client = await db;
  client.close();
  console.log("Connection to DB closed");
});

// client.connect((err) => {
//   const collection = client.db('test').collection('devices')
//   // perform actions on the collection object
//   client.close()
// })

module.exports = db;
