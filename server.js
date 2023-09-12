const { app } = require("./app");

const setupConnection = require("./utils/setupMongoConnect");
setupConnection()
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful...");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
