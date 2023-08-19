const { connect } = require("mongoose");

const connectDB = async () => {
    try {
        const DB = await connect(process.env.DB_HOST);
        console.log(`Db is connected. NAME: ${DB.connection.name}. HOST: ${DB.connection.host}. PORT: ${DB.connection.port}`
                .green.italic.bold
        );
    } catch (error) {
        console.log(error.message.red.bold);
        process.exit(1);
    }
};

module.exports = connectDB;