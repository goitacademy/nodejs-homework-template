const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();
const { PORT = 3000 } = process.env;
// нужно добавить поддержку dotenv!!!
const connection = mongoose.connect(
  "mongodb+srv://user:v4pZ48LD8GxdZLM7@cluster0.zhplhfe.mongodb.net/?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true, dbName: "db-contacts" }
);

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`)
  );
