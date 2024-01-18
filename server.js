require("dotenv").config();

require("./db");

const app = require("./app");

app.listen(8080, () => {
  console.info("Server started on port 8080");
});