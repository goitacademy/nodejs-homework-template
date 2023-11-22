const app = require("./app");
const { serverPort } = require("./config");
const db = require("./db");

// Ta funkcja ponizej to IIFE - https://developer.mozilla.org/en-US/docs/Glossary/IIFE
// Uzywamy jej dlatego, zeby miec dostep do skladni async/await w tym miejscu
// Jeśli uzywalibysmy ESModules IIFE nie byłoby konieczne
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
