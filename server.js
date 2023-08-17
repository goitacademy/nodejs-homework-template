const path = require("path");
const app = require("./app");
require("colors");
const configPath = path.join(__dirname, "./config/.env");
require("dotenv").config({ path: configPath });

const { DEV_SERVER_PORT = 3000 } = process.env;

app.listen(DEV_SERVER_PORT, () => {
  console.log(
    `Server running. Use our API on port: ${DEV_SERVER_PORT}`.black
      .bgBrightGreen
  );
});
