const mongoClient = require("mongodb").MongoClient;
const collections = require("./collections");

const connectMongo = async () => {
  const client = await mongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db("db");
  collections.Contacts = db.collection("contacts");
};

module.exports = { connectMongo };
