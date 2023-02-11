const app = require("./app");
require("dotenv").config();

app.listen(process.env.PORT, () => {
  console.log("Server running. Use our API on port: 3000");
});
