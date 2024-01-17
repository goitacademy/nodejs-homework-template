const express = require("express");
const logger = require("morgan");
const cors = require("cors");

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
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
<<<<<<< HEAD

// {
//   "id": "AeHIrLTr6JkxGE6SN-0Rw",
// "name": "Allen Richmond",
// "email": "nulla.rich@vestibul.co.uk",
// "phone": "(992) 914-3792"
// },
=======
>>>>>>> dde0c06544d8d0fbe61967dfadf96a7f8202570b
