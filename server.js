require("dotenv").config();

require("./db");

const app = require("./app");

app.listen(3000, () => {
  console.info("Server started on port 3000");
});
