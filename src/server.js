const app = require("./app");
const dotenv = require("dotenv");
const path = require("path");
// const { MongoClient } = require("mongodb");
const { default: mongoose } = require("mongoose");


dotenv.config({ path: path.join(__dirname, ".env") });

const PORT = process.env.PORT || 3000;
const url = process.env.MONGODB_URL;
// const dbName = process.env.MONGODB_NAME;

const client = mongoose.connect(url, {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  // const db = client.db(dbName);
  // const contacts = db.collection("contacts");
  app.listen(PORT, (err) => {
    if (err) console.error("Error at aserver launch:", err);
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}

main();
