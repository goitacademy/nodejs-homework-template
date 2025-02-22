const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Połączono z MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Błąd połączenia z MongoDB: ${error.message}`);
    process.exit(1); // Zakończ proces w przypadku błędu
  }
};

module.exports = connectDB;
