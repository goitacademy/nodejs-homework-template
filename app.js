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
  res.status(500).json({ message: err.message });
});




module.exports = app;


// app.get("/api/contacts", (req, res) => {
//   console.log({ method: req.method, url: req.url });
//   res.send("Home");
// });

// app.listen(8000, () => {
//   console.log("Server running on port 8080");
// });
