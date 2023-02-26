const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
// const app = require("./app");
const app = express();

const { connectMongo } = require("./db/connection");
const contactsRouter = require("./routes/api/contacts");



const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("tiny"));

app.use("api/contacts", contactsRouter);

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

const start = async () => {
  try {
    await connectMongo();

    app.listen(PORT, (err) => {
      if (err) console.log("Error at server launch", err);
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to launch application with error: ${err.message}`);
  }
};

start();
