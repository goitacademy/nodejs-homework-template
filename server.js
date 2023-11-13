import app from "./app.js";

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// Connection string do twojej bazy danych MongoDB w MongoDB Atlas
const dbConnectionURI = process.env.DB_URL;

// Ustanawianie połączenia
mongoose.connect(dbConnectionURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Obsługa błędów
const db = mongoose.connection;

db.on("error", (error) => {
  console.error("Database connection error:", error);
  process.exit(1); // Zakończ proces w przypadku błędu
});

db.once("open", () => {
  console.log("Database connection successful");
});
