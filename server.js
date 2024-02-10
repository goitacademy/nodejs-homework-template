import express from "express";
import cors from "cors";
import mongoose, { set } from "mongoose";
import dotenv from "dotenv";
import setJWTStrategy from "./config/jwt.js";

import api from "./routes/index.js";
dotenv.config(); //1.
//
const { DB_HOST } = process.env; //2.

const app = express(); //3.
app.use(express.json()); //4.
app.use(cors()); //5.

setJWTStrategy(); // Add this line

app.use("/api", api); //10. to jest middleware

// const connection = mongoose.connection(DB_HOST); //6.
const PORT = process.env.PORT || 3000; // Ustaw domyślną wartość 3000, jeśli PORT nie jest zdefiniowany w .env

// Połączenie z bazą danych MongoDB
mongoose
  .connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Zakończ proces Node.js w przypadku niepowodzenia połączenia
  });

// connection.then(() => {
//   //7.
//   app.listen(3000, () => {
//     //8.
//     console.log("Server is running on port 3000"); //9.
//   }); // do tego powinna jeszcze obsluga bledow, musisz ja dopisac
// });
