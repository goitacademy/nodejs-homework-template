const { connect } = require("mongoose");

const connectDB = async () => {
  try {
    const DB = await connect(process.env.DB_HOST);
    console.log(
      `Database connection successful. Name: ${DB.connection.name}. Host ${DB.connection.host}. Port ${DB.connection.port}`
        .green.bold.italic
    );
  } catch (error) {
    console.log(error.message.red.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
