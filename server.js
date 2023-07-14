const app = require('./app')

const mongoose = require("mongoose");
//RyiLxMJCxERKxyG3

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true)

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () =>
      console.log("Server running. Use our API on port: 3000")
    );
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// mongoose.connect(DB_HOST)
//   .then(() => console.log("Database connection successful"))
// .catch(eroor => console.log(error.message))





// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })
