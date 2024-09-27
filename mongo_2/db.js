let { connect } = require("mongoose");

let connectDB = async () => {
    let { MONGODB_URI } = process.env;
    let db = await connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log(
        `MongoDB are connected: DB-name: ${db.connection.name}, Cluster: ${db.connection.host}, PORT: ${db.connection.port} `
            .cyan.bold
    );
};

module.exports = connectDB;
