const mongoose = require("mongoose");

const app = require('./app');
const {DB_HOST} = process.env;
mongoose.set("strictQuery", true)

mongoose.connect(DB_HOST)
  .then(() => {
    console.log("Server is running");
    app.listen(3000, () => console.log("port 3000"));
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1)
  })





