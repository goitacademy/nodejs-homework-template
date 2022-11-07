const app = require("./app");
const MongoClient = require("mongodb").MongoClient;

const PORT = process.env.PORT;

const start = async () => {
  const client = await MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiendTopology: true,
  });
  const db = client.db();
  const Contacts = db.colection("contacts");
  const contacts = await Contacts.find({}).toArray();
  console.log(contacts);
  app.listen(PORT, () => {
    console.log("Server running. Use our API on port: 3000");
  });
};

start();
