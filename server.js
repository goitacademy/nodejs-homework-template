const { connect } = require("mongoose");

const app = require("./app");
const { mongoUrl } = require("./config");

connect(mongoUrl, { dbName: "db-contacts" })
  .then(() => {
    console.log("Database connection successful");

    app.listen(5000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
