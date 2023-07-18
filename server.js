const mongoose = require("mongoose");
const app = require("./app");

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
      console.log("Database connection succesful");
    });
  })
  .catch(() => process.exit(1));
