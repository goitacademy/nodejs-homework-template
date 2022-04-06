const { mongoose } = require("mongoose");
require("dotenv").config();

const uri = process.env.URI_DB;
// const db = MongoClient.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// process.on("SIGINT", async () => {
//   console.log("Disconnect from db");
//   const client = await db;
//   await client.close();
//   process.exit(1);
// });

// const getCollection = async (db, nameCollection) => {
//   const client = await db;
//   const collection = client.db().collection(nameCollection);
//   return collection;
// };

// module.exports = { getCollection };

mongoose.connection.on("connected", () => {
  console.log("Mongoose to connect to db");
});

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose connection error:  + ${err}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

const db = mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

process.on("SIGINT", async () => {
  mongoose.connection.close(() => {
    console.log("Disconnect from db");
    process.exit(1);
  });
});

module.exports = db;
