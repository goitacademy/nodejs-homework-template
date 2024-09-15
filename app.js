const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { jwtStrategy } = require("./config/jwt");
const { errorMiddleware } = require("./middleware/errorMiddleware");
const path = require("path");

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

jwtStrategy();

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/contacts", contactsRouter);
app.use("/api/users", authRouter);

app.use((req, res) => {
  res.status(404).json({
    message: `Not found - ${req.path}`,
  });
});

app.use(errorMiddleware);

module.exports = app;
