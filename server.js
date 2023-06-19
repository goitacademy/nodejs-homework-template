const mongoose = require("mongoose");
const app = require("./app");

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DB)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
