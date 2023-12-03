const mongoose = require("mongoose");
const app = require('./app');


mongoose.set('strictQuery', true);
const {DB_HOST, PORT = 3000} = process.env;


mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3000")
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });
