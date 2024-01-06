const app = require("./app");
const utils = require("./utils");
// import app from "./app.js";

app.listen(3000, () => {
  utils.prepareEnvironment();
  console.log("Server running. Use our API on port: 3000");
});
