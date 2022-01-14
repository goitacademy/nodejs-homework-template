import pkg from "mongoose";
const { connect, connection } = pkg;

const uri = process.env.URI_DB;

const db = connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.on("connected", () => {
  console.log("Mongoose is connected to db!");
});
connection.on("err", (err) => {
  console.log(`Mongoose connection error: ${err.message}`);
});
connection.on("disconnected", () => {
  console.log("Mongoose is disconnected from db!");
});
process.on("SIGINT", async () => {
  connection.close();
  console.log("Connection DB closed");
  process.exit(1);
});

export default db;
