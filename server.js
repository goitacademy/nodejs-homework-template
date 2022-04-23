const app = require("./app");
require("dotenv").config();

app.listen(3000, () => {
  console.log(process.env.NODE_ENV);
  console.log("Server running. Use our API on port: 3000");
});
