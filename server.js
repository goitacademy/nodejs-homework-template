const app = require("./app");
const mongoDB = process.env.MONGO_URL;
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
  mongoose
    .connect(mongoDB)
    .then(() => {
      console.log("Database connection successful!");
    })
    .catch((err) => {
      console.log("Error to connect to the database:", err);
      mongoose.connection.close();
    });
});
