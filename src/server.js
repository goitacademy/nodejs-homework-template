require("dotenv").config();
const app = require("./app");
const { getConfig } = require("./config");
const dbConnection = require("./db/db");

const port = getConfig().port;

const start = async () => {
  try {
    await dbConnection();
    app.listen(port, () => {
      console.log(`Server running. Use our API on port: ${port}`);
    });
  } catch (error) {
    console.log(error.massage);
  }
};
start();
