const { MongoClient } = require("mongodb");
// const collections = require("./collections");

const connectMongo = async () => {
  const client = await MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();

  const Contacts = db.collection("contacts");
  return { Contacts };
  console.log('DatabaseE connected succesfull');
};

module.exports = {
  connectMongo,
};
