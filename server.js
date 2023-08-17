const app = require("./app");
require("colors");
require("dotenv").config();

const { DEV_SERVER_PORT = 3000 } = process.env;

app.listen(DEV_SERVER_PORT, () => {
  console.log(
    `Server running. Use our API on port: ${DEV_SERVER_PORT}`.black
      .bgBrightGreen
  );
});
