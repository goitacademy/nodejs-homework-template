const app = require("./app");
const db = require("./config/db");

db.then(() => {
  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000");
  });
}).catch(console.error);
