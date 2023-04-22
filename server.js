const mongoose = require("mongoose");
const app = require("./app");

const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

const connection = mongoose.connect(DB_HOST, {
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(3000, () => {
      console.log(
        "Database connection successful. \nServer running. Use our API on port: 3000. \nhttp://localhost:3000/api/contacts"
      );
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
