const app = require("./app");
const { connectMongo } = require("./db/connections.js");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const start = async () => {
  connectMongo();
  // const client = await MongoClient.connect(process.env.MONGO_URL);

  // console.log("Connected successfully to server");
  // const dbName = "contactsdb";
  // const db = client.db(dbName);
  // const Contacts = db.collection("contacts");
  // const contacts = await Contacts.find({}).toArray();
  // console.log(contacts);
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
};

start();
