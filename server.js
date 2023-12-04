const app = require("./app");

const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Golik:0xBQsZQURjCKx8JS@cluster0.3xl6qn2.mongodb.net/contacts_reader";

mongoose
  .connect(DB_HOST)
  .then(
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// 0xBQsZQURjCKx8JS
