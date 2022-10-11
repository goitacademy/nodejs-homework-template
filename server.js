const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const url =
  "mongodb+srv://VladyslavMas:VladosBos1@cluster0.hn5tfca.mongodb.net/db-contacts?retryWrites=true&w=majority";
//const url = process.env.MONGO_URL;

const connection = mongoose.connect(url, {
  useNewUrlParser: true,
});

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
