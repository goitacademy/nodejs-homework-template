const app = require("./app");
const dotenv = require("dotenv");
const path = require("path");
const { connectMongo } = require("./db/connections");
// const mongoose = require("mongoose");

dotenv.config({ path: path.join(__dirname, ".env") });

const PORT = process.env.PORT || 3000;
// const url = process.env.MONGODB_URL;
// console.log('url', url)
// const dbName = process.env.MONGODB_NAME;

// const client = mongoose.connect(url, {
//   promiseLibrary: global.Promise,
//   useNewUrlParser: true,
//   // useCreateIndex: true,
//   useUnifiedTopology: true,
//   // useFindAndModify: false,
// });

const main = async () => {
  try {
    //   const client = new MongoClient(`${url}/${dbName}`);

    //   await client.connect();
      // console.log("Connected successfully to server");

    //   const db = client.db(dbName);
    //   const contacts = db.collection("contacts");
    await connectMongo();
    app.listen(PORT, (err) => {
      if (err) console.error("Error at aserver launch:", err);
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (err) {
    console.log(`Failed to launch applicatin with error ${err.message}`);
  }

  //   app.listen(PORT, (err) => {
  //     if (err) console.error("Error at aserver launch:", err);
  //     console.log(`Server running. Use our API on port: ${PORT}`);
  //     // Use connect method to connect to the server

  //   });
  //   console.log('contacts', contacts)
  //   return contacts;
};

main();

// client
//   .then(() => {
//     app.listen(PORT, (err) => {
//       if (err) console.error("Error at aserver launch:", err);
//       console.log(`Server running. Use our API on port: ${PORT}`);
//     });
//   })
//   .catch((err) =>
//     console.log(`Server not running. Error message: ${err.message}`)
//   );

//   const db = client.db(dbName);
// const contacts = db.collection("contacts");
// return contacts
