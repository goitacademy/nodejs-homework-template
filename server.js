const mongoose = require("mongoose");
const app = require("./app");

const DB_CONNECT_TEMP = require("./tempConf");

(async function startServer() {
  try {
    // const { DB_CONNECT } = process.env;
    await mongoose.connect(DB_CONNECT_TEMP);

    app.listen(3000, () => {
      console.log("DB has connected successful");
      console.log("Server running");
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
})();
