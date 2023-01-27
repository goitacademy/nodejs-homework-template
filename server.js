const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();
require("dotenv").config();
const server = require("http").createServer(app);

const PORT = process.env.PORT;

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const { connectMongo } = require("./src/db/connection");
const { contactsRouter } = require("./src/routers/contactsRouter");

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found " });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const start = async () => {
  try {
    await connectMongo();

    server.listen(PORT, (err) => {
      if (err) console.error("Error at aserver launch:", err);
      console.log(`Server works at port ${PORT}!`);
    });
  } catch (err) {
    console.error(`Failed to launch application with error: ${err.message}`);
    process.exit(1);
  }
};

start();
