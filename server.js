const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

const db = mongoose.connect(uriDb, {
  useUnifiedTopology: true,
  dbName: "db-contacts",
});

db.then(() => {
  app.listen(PORT, () => {
    console.log("Database connection successful");
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((err) =>
  console.log(`Server not running. Error message: ${err.message}`)
);
