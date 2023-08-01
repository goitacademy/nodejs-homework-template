const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const contactsRouter = require("./routes/api/contacts");
const uriDb =
  "mongodb+srv://cmdspeed:qwertyuiop69@goit.yo8ofoh.mongodb.net/db-contacts?retryWrites=true&w=majority";

  

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
  res.status(500).json({ message: err.message });
});
const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,

  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(3000, "localhost", function () {
      console.log(`Database connection successful`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  }
  );

module.exports = app;
