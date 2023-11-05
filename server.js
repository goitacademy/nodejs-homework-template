const mongoose = require("mongoose");
const app = require("./app");

const DB_HOST =
  "mongodb+srv://Mykhailo:t0UBOC2YzK2YJiu4@cluster0.u51epge.mongodb.net/contacts";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
