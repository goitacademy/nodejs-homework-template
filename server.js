const mongoose = require("mongoose");

const app = require("./app");
const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

// connect to basedata
mongoose
  .connect(
    DB_HOST
    // {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // }
  )
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    // disables running processes
    process.exit(1);
  });
