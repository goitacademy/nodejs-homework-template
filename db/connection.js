const { MongoClient } = require("mongodb");

const connectMongo = async () => {
  
    const client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db();

    const Contacts = db.collection("contacts");
  
};

module.exports = {
  connectMongo,
};
