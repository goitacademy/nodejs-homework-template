const { app } = require("./app");
const db = require("./db");
const { serverPort } = require("./config");

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
