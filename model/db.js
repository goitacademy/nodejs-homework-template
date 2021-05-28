const { MongoClient } = require("mongodb");
require("dotenv").config();
const uriDB = process.env.URI_DB;

const db = MongoClient.connect(uriDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 5,
}); // настроийки default

// когда прерываем работу приложения, закрываем работу с базой данных. Настройка большого количества connections и они были открыты
process.on("SIGINT", async () => {
  const client = await db;
  client.close();
  console.log("Connection to db terminated");
  process.exit(1);
});

module.exports = db;
