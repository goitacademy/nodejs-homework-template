const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api");
const authRouter = require("./routes/api/authRouter");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
require("./config/passport");

app.use("/api/users", authRouter);
app.use("/api/user", authRouter);
app.use("/", (req, res) => {
  res.status(404).json({message: "Not found!"});
});

app.use((err, _, res, __) => {
  const {status = 500, message = "Internal Server Error"} = err;
  res.status(status).json(message);
});

module.exports = app;
