// connection to MongoDB
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const routerApi = require("./api");

const { DB_HOST: uriDB } = process.env;
const connection = mongoose.connect(uriDB);

//4. robimy apke
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", routerApi);

// obsluga 404
app.use((req, res) => {
  res.status(404).json({ message: `woops something went wrong ${req.path}` });
});
// blad 500
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ message: err.message });
});
//--------------------------------
async function startServer() {
  // teraz ten server wyglada bardziej przejrzyscie, musisz go wywolac na koncu skryptu
  try {
    await connection;
    console.log("Connected to MongooDB");
    app.listen(3000, () => {
      console.log("Server is running on port: 3000"); // aktualizacja komunikatu
    });
  } catch (err) {
    console.log("DataBase not connected, shutting down", err);
    process.exit(1);
  }
}

// connection // pamietaj lapiemy sukcesy i bledy w polaczeniu
//   .then(() => {
//     console.log("Connected to MongooDB");
//   })
//   .catch((err) => {
//     console.log("DataBase not connected, shutting down", err);
//     process.exit(1);
//   });
// connection to MongoDB
//--------------------------------
startServer();
