// const mongoose = require("mongoose");
// require('dotenv').config();
const { MongoClient } = require("mongodb");

const app = require("./app");

const DB_HOST =process.env.DB_HOST;
  
console.log({DB_HOST});

const client = new MongoClient(DB_HOST);

async function run() {
  try{
    await client.connect();

    await client.db("admin").command({ping: 1});

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch(error) {
  console.error(error);
  process.exit(1);
} finally{
  await client.close();
}};

run().catch(console.dir)
// mongoose
//   .connect(DB_HOST)
//   .then(() => {
//     app.listen(3000);

//     console.log("Database connection successful");

//   })
//   .catch(error => {
//     console.log(error.message);
//     // process.exit(1);
//   });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });
