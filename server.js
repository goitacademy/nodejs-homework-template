require("dotenv").config();
require("./db/db");

const app = require("./app");

const PORT = 3000;
console.log(process.env.PORT);

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
