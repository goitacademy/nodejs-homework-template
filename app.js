const express = require("express");
const helmet = require("helmet");

const logger = require("morgan");
const cors = require("cors");
const app = express();
const limiter = require("./middleware/rate-limit");
const contactsRouter = require("./routes/api/contacts/contacts");
const authRouter = require("./routes/api/auth/index");
const usersRouter = require("./routes/api/users");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(limiter(15 * 60 * 1000, 100));
app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: 10000 }));
app.use(express.static(process.env.STATIC_FOLDER));
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
