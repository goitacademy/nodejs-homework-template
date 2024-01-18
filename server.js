const { app } = require("../goit-nodejs-hw/app");
// const db = require("./db");
const db = require("../goit-nodejs-hw/db");
// const { serverPort } = require("./config");
const { serverPort } = require("../goit-nodejs-hw/config");

(async () => {
  try {
    await db.connect();
    console.log("Database connection established.");
    app.listen(serverPort, async () => {
      console.log(`Server running. Use our API on port: ${serverPort}`);
    });
  } catch (e) {
    console.error(e.message);
  }
})();
