const MongoClient = require("mongodb").MongoClient;
const collections = {};
require("dotenv").config();
const getCollections = () => {
  return collections;
};
const connectMongo = async () => {
  const client = await MongoClient.connect(process.env.MONGO_URL);
  console.log("Connected successfully to server");
  const dbName = "contactsdb";
  const db = client.db(dbName);
  // const Contacts = db.collection("contacts");
  collections.Contacts = db.collection("contacts");
  // return { Contacts };
  // const contacts = await Contacts.find({}).toArray();
  // console.log(contacts);
};
module.exports = { connectMongo, getCollections };
