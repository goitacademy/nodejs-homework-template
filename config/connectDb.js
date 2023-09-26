const { connect } = require('mongoose');

async function connectDb() {
  try {
    const db = await connect(process.env.DB_HOST);
    console.log(
      `Database connection successful.\nName:${db.connection.name}. Host: ${db.connection.host}. Port: ${db.connection.port}.`
        .green.italic.bold
    );
  } catch (error) {
    console.log(error.message.red.bold);
    process.exit(1);
  }
}

module.exports = connectDb;
