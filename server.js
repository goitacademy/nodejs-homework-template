const app = require("./app");
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

const start = async () => {
  const client = await MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  });
const db = client.db()

const Contacts = db.collection('contacts');
const contacts = await Contacts.find({

})  
console.log(contacts);

  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000");
  });
};

start();
