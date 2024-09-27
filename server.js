const mongoose = require("mongoose");
const app = require('./app');

const dbURL =
  "mongodb+srv://mrmaddarknes:sNI2jv2le4icneK8@vorongorclacter.hsxv0qo.mongodb.net/db-contacts";

mongoose.connect(dbURL);

const db = mongoose.connection;

db.on("connected", () => {
  console.log(`Підключено до MongoDB Atlas на ${dbURL}`);
});

db.on("error", (err) => {
  console.error("Помилка підключення до MongoDB Atlas:", err);
});

db.on("disconnected", () => {
  console.log("Відключено від MongoDB Atlas");
});

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
