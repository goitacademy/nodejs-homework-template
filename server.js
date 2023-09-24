const mongoose = require("mongoose");
const app = require("./app");

mongoose.Promise = global.Promise;

const PORT = process.env.PORT || 3000;
const urlDb = process.env.DB_HOST;

mongoose.set("strictQuery", true);

mongoose
  .connect(urlDb)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
