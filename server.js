const app = require("./app");
const mongoose = require("mongoose");
const { DB, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB)
  .then(() => app.listen(PORT), console.log("Database connect success"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
