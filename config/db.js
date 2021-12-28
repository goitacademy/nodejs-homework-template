import mongoose from "mongoose";

const { connect, connection } = mongoose;

const uri = process.env.URI_DB;

const db = connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.on("connected", () => {
  console.log("Mongoose connected to db");
});

connection.on("err", (err) => {
  console.log(`Mongoose connection error: ${err.message}`);
});

connection.on("disconnected", () => {
  console.log("Mongoose connected from db");
});

process.on("SIGINT", async () => {
  connection.close();
  console.log("Connection DB closed");
  process.exit(1);
});

export default db;
