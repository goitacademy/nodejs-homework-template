const { connect } = require("mongoose");
require("colors");

const connectDb = async () => {
  try {
    const db = await connect(process.env.CONNECTION);
    console.log(
      `
    Name: ${db.connection.name}
    Port: ${db.connection.port}
    Host: ${db.connection.host}
    `.magenta.italic
    );
  } catch (error) {
    console.log(error.message.red);
    process.exit(1);
  }
};

module.exports = connectDb;
