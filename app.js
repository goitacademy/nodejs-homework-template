const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const authRouter = require("./routes/api/auth");
const mongoose = require("mongoose");
const contactsRouter = require("./routes/api/contacts");
const DB_HOST = "mongodb+srv://alisa:alisa1996@cluster0.sweamin.mongodb.net/contacts_reader?retryWrites=true&w=majority";
const app = express();

mongoose.set("strictQuery", true);
mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use("", (req, res) => {
  res.status(404).json({ message: "Not found" });
});
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
console.log("Server running");
app.listen(3000, () => {});

module.exports = app;
