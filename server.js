const app = require("./app");
const { serverPort } = require("./config");
const db = require("./db");

(async () => {
  try {
    await db.connect();
    console.log("Database connection successful.");

    app.listen(serverPort, async () => {
      console.log(`🚀 Server is running on port ${serverPort}`);
    });
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
})();

process.on("SIGINT", async () => {
  await db.disconnect();
  console.log("Database connection closed");
  process.exit();
});
