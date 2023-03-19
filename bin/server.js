const { connect } = require("mongoose");
const connectDB = async () => {
  const { MONGODB_URI } = process.env;
  const db = await connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(
    `MongoDB are connected: DB-name: ${db.connection.name}, Cluster: ${db.connection.host}, `
      .cyan.bold
  );
};

module.exports = connectDB;
