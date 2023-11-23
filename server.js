
const app = require('./app');
const mongoose = require("mongoose");

app.listen(3000, () => {
  mongoose
    .connect("mongodb+srv://miguelangelortizacosta123:54321@cluster0.q53m8c4.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log("Database connection successful"))
    .catch(error => {
      console.log("There was an error", error);
      process.exit(1);
    });

  console.log("Server running. Use our API on port: 3000");
});
