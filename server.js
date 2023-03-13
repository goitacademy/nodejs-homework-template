require('dotenv').config();
const { connect } = require('mongoose');
const app = require('./app')

const PORT = process.env.PORT || 3000
const uriDb = process.env.DB_HOST

const connectDb = async () => {
  try {
    const db = await connect(uriDb);
    console.log('Database connection successful');
    console.log(`Connected Mongo port: ${db.connection.port}, host:${db.connection.host}, name:${db.connection.name}`)

    if (db.connection.port) {
      app.listen(PORT, function () {
        console.log(`Server running. Use our API on port: ${PORT}`)
      })
    }

  } catch (error) {

    console.log(`Server not running. Error message: ${error.message}`)
    process.exit(1);
  }
};


(async () => {
  connectDb();
})();

