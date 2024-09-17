const mongoose = require("mongoose");
const app = require("./app");

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    console.log('Database connection successful')
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
