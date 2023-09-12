const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use((_, res) => {
  res.status(404).json({ status: 404, message: "Not Found" });
});

app.use((err, _, res, __) => {
  res.status(err.status ?? 500).json({
    status: err.status ?? 500,
    message: err.message ?? "Internal Server Error",
  });
});

module.exports = app;
