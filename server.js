import app from "./app.js";
app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
import mongoose from "mongoose";

// Connection string do twojej bazy danych MongoDB w MongoDB Atlas
const dbConnectionURI =
  "mongodb+srv://MonikaG:Mm29030405@cluster0.eeog9dx.mongodb.net/";

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