// const fs = require("fs/promises");
// const pah = require("path");

// class FileAdapter {
//   constructor(file) {
//     this.store = pah.join(__dirname, file);
//   }

//   async read() {
//     const result = await fs.readFile(this.store, "utf-8");
//     const data = JSON.parse(result);
//     return data;
//   }

//   async write(data) {
//     await fs.writeFile(this.store, JSON.stringify(data));
//   }
// }
require("dotenv").config();
const { MongoClient } = require("mongodb");
const uri = process.env.URL_DB;

const db = MongoClient.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

process.on("SIGINT", async () => {
  const client = await db;
  client.close();
  console.log("Connection for DB closed");
});

// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

module.exports = db; // db это промис отложенный
