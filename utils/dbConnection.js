const { connect } = require("mongoose");
require("dotenv").config();

const { DB_USER, DB_PASS, DB_NAME } = process.env;

const DB_HOST = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.domin4s.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

async function dbConnection() {
  try {
    const db = await connect(DB_HOST);
    console.log(
      `Database is connected. Name:${db.connection.name}. Host:${db.connection.host}. Port:${db.connection.port}`
        .green.italic.bold
    );
  } catch (error) {
    console.log(error.message.red.bold);
    process.exit(1);
  }
}
module.exports = dbConnection;
