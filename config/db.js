const {connect} = require('mongoose');

const connectDB = async () => {
    await connect(process.env.MONGO_DB_URI);
    console.log('Database connection successful!'.cyan)
}

module.exports=connectDB;