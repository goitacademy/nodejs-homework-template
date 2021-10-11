const app = require("../app");
const db = require("../config/db");
require("dotenv").config();

const PORT = process.env.PORT || 8082;

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((err) => {
  console.log(`Server not run. Error: ${err.message}`);
});
