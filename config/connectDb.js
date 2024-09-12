const {connect} = require("mongoose");
const path = require("path");
const configPath = path.join(__dirname, ".", ".env");
require("dotenv").config({ path: configPath })

async function connectDb() {
  try {
    const db = await connect(process.env.DB_HOST);
    console.log(`Database is connected. Name:${db.connection.name}. Host:${db.connection.host}. Port:${db.connection.port}`.green.italic.bold);
  } catch (error) {
    console.log(error.message.red.bold)
    process.exit(1)
  }
}
module.exports = connectDb;