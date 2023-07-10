const app = require('./app')

const mongoose = require("mongoose");

mongoose.set("strictQuery", true);


const { DB_HOST, PORT} = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT)
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  })

// app.listen(4000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })
