import pkg from "mongoose";
const { connect, connection } = pkg;

const uri = process.env.URI_DB;

const db = connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.on("connected", () => {
  console.log("Mangoose connected to DB");
});

connection.on("err", (err) => {
  console.log(`Mangoose connection error: ${err.message}`);
});

connection.on("deisconnected", () => {
  console.log("Mangoose deisconnected from DB");
});

process.on("SIGINT", async () => {
  connection.close();
  console.log("Connection DB closed");
  process.exit(1);
});

export default db;
