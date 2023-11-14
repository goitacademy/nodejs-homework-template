// const { MongoClient } = require("mongodb");
// const DB_URI =
//   "mongodb+srv://mywork1728:ceeg5FsRfDJBKyeb@cluster0.5nmd3kh.mongodb.net/?retryWrites=true&w=majority";

// const client = new MongoClient(DB_URI);

// async function run() {
//   try {
//     await client.connect();
//     const dbContacts = client.db("db-contacts");
//     const collections = await dbContacts.listCollections().toArray();
//     console.log(collections);
//   } catch (error) {
//     console.error(error);
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.error);

const mongoose = require("mongoose");
require("dotenv").config();

const DB_URI = process.env["DB_URI"];

async function run() {
  try {
    await mongoose.connect(DB_URI);
    console.log("Database connection successful");
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
  }
}

run().catch(console.error);
