const app = require("./app");

const mongoose = require("mongoose");

const connectionDb = mongoose.connect(process.env.HOST);

connectionDb
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  });
