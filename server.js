const app = require("./app");
const mongoose = require("mongoose");
const { DB_HOST, PORT = 3000 } = process.env;
mongoose.set("strictQuery", "true");

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("DB connect sussess");
    app.listen(PORT, () => {
      console.log("Server running.");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
