// const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const connectMongo = async () => {
  return await mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // const db = await client.db();

  // collections.Contacts = await db.collection("contacts").find({}).toArray();
};
module.exports = {
  connectMongo,
};
