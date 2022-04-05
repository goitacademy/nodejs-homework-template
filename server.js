const app = require("./app");
const db = require("./db/db");

db.then(() => {
  console.log("Connected to db");
  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000");
  });
}).catch(console.error);
