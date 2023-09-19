const app = require("./app");
const mongoose = require("mongoose");

const { MDB_HOST } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(MDB_HOST)
  .then(() => {
    console.log("MDB connection successful");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
