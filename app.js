const express = require("express");
const logger = require("morgan");
const cors = require("cors");
 
// const start = async () => {
//   await connectMongo(); 
//   // const contacts = await Contacts.find({});
//   // console.log(contacts);
//   app.listen(PORT, (err) => {
//     if (err) console.log("Error at server launch:", err);
//     console.log("Server works at port ${PORT}!");
//   });
// };
// start();

// const connectMongo = require("./controllers/db/connection");


require("dotenv").config();
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  res.status(500).json({ message: err.message });
});

module.exports = app;
