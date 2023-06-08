const app = require("./app");
const db = require("./db");

db.connect();

app.listen(4000, () => {
  console.log("Server running. Use our API on port: 4000");
});
