import app from "./app.js";

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// Connection string do twojej bazy danych MongoDB w MongoDB Atlas
//const dbConnectionURI = process.env.DB_URL;
const dbConnectionURI =
  "mongodb+srv://mielnikmagdalena:3kMJIYHF3nYNLhGT@cluster0.5lgwxxf.mongodb.net/db-contacts";
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
  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000");
  });
});
