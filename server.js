require("dotenv").config(); // Wczytujemy zmienne środowiskowe z pliku .env
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_URL;
const authSecret = process.env.AUTH_SECRET;

if (!uriDb) {
  console.error("DB_URL is not defined in the environment variables");
  process.exit(1);
}

if (!authSecret) {
  console.error("AUTH_SECRET is not defined in the environment variables");
  process.exit(1);
}

// Łączymy się z bazą danych
mongoose.connect(uriDb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connection successful");
    // Uruchamiamy serwer
    app.listen(PORT, () => {
      console.log("Server is running on port ${PORT}");
    });
  })
  .catch((err) => {
    console.error("Server not running. Error message: ${err.message}");
    process.exit(1);
  });