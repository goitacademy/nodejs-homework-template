const pkg = require("mongoose");
const { connect, connection } = pkg;
const dotenv = require("dotenv");

require("../helpers");
const { MESSAGES } = require("../utils");
dotenv.config({ path: "./config/.env" });

const { URI_DB } = process.env;

const db = connect(URI_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.on("connected", () =>
  console.log(`${MESSAGES.connected}`.brightBlue.bold)
);

connection.on("err", (err) =>
  console.log(`${MESSAGES.errMsg}: ${err.message}`.red.bold)
);

connection.on("disconnected", () =>
  console.log(`${MESSAGES.disconnected}`.brightBlue.bold)
);

process.on("SIGINT", async () => {
  connection.close();
  console.log(`${MESSAGES.closeConnection}`);
  process.exit(1);
});

module.exports = db;
