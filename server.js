const path = require("path");
const app = require("./app");
require("colors");
const configPath = path.join(__dirname, "./config/.env");
require("dotenv").config({ path: configPath });

const SERVER_PORT = process.env.SERVER_PORT || 3000;

app.listen(SERVER_PORT, () => {
  console.log(
    `Server running. Use our API on port: ${SERVER_PORT}`.black.bgBrightGreen
  );
});
