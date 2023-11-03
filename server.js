const app = require("./app");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require("dotenv").config();
const mongoDB = process.env.MONGO_URL;
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`The server is running at port ${port}`);
  mongoose
    .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Database connection successful");
    })
    .catch((err) => {
      console.error("Error to connect to the database:", err);
      mongoose.connection.close(() => {
        console.log("Database connection has been closed due to an error.");
      });
    });
});
