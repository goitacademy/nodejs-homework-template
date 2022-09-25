const { MongoClient } = require("mongodb");
const URL = process.env.MONGO_URL;
const collection = {};

const getCollection = () => {
  return collection;
};

const connectMongo = async () => {
  const client = await MongoClient.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();
  collection.Contacts = db.collection("contacts");
};
module.exports = { connectMongo, getCollection };
