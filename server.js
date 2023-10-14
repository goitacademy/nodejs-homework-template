const app = require("./app");
const mongoose = require("mongoose");
const { DB_HOST, DB_NAME } = process.env;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: DB_NAME,
  })
  .then(() => {
    console.log("Database connection successful");
    console.log("Using database:", DB_NAME);
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
