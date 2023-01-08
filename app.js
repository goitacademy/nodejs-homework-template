const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();
const { errorHandler } = require("./helpers/apiHelpers");
const contactsRouter = require("./routes/api/contacts");
const { authRouter } = require("./routes/authRouter");
const avatarRouter = require("./routes/api/avatars");
app.use((err, req, res, next) => {
  res.status("500").json({ message: err.message });
});
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.get("/", function (req, res) {
  res.send("DataBase of Contacts");
});
app.use("/api/contacts", contactsRouter);
app.use("/api/users", authRouter);
app.use("/avatars", avatarRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(errorHandler);

module.exports = app;
// qweqwe
