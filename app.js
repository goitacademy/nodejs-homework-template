require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const path = require("path");

const passport = require("./passport");
require("dotenv").config();

const apiRouter = require("./routes/api/index");

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/auth");  
const userRouter = require("./routes/user"); 
const connectDB = require("./config/db"); 

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

app.use("/avatars", express.static(path.join(__dirname, "public/avatars")));

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);  
app.use("/api/users", userRouter); 

app.use((_, res, __) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _, res, __) => {
  res.status(500).json({ message: err.message });
});

connectDB();

module.exports = app;
