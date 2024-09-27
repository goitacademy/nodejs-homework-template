const app = require("./app");
const mongoose = require("mongoose");

const { DB_HOST, PORT = 3000 } = process.env;
console.log(process.env.DB_HOST)
mongoose.set("strictQuery", true);

mongoose
   .connect(DB_HOST)
   .then(() => {
      console.log("Database connection successful");
      app.listen(PORT);
   })
   .catch((error) => {
      console.log(error.message);
      process.exit(1);
   });