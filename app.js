const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");

const app = express();

const contacts = require("./models/contacts.json");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

// app.get("/", (req, res) => {
//   res.send("<h2>Home page</h2>");
// });
// app.get("/api/contacts", (req, res) => {
//   res.json(contacts);
// });

// app.get("/api/contacts/:id", (req, res) => {
//   res.json(contacts[0]);
// });

// app.post("/api/contacts", (req, res) => {
//   res.json(contacts[0]);
// });
// app.put("/api/contacts/:id", (req, res) => {
//   res.json(contacts[0]);
// });
// app.delete("/api/contacts/:id", (req, res) => {
//   res.json(contacts[0]);
// });

// app.use((req, res, next) => {
//   res.status(404).json({ message: "Not found" });
//   console.log("first middleware");
//   next();
// });

// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message });
//   console.log("Second middleware");
//   next();
// });

// app.listen(3001, () => console.log("Hello"));
module.exports = app;
