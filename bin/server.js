const app = require("../src/app.js");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
