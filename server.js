require("dotenv").config();
const { connectMongo } = require("./db/connection.js");
const app = require("./app");
const PORT = process.env.PORT || 3000;

const start = async () => {
  await connectMongo();
  // const client = await MongoClient.connect(URL, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });
  // const db = client.db();
  // const Contacts = db.collection("contacts");
  // const contacts = await Contacts.find({}).toArray();
  // console.log(contacts);
  app.listen(PORT, (err) => {
    if (err) {
      console.error("Error at server launch");
    }
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
};
start();
