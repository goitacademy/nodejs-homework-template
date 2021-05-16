const app = require("../app");
require("dotenv").config();
require("../model/db");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
