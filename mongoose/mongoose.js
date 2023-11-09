const mongoose = require("mongoose");


require("dotenv").config();


const DB_URI = process.env.DB_URI;

async function connectionDatabase () {
    try {
        console.log(process.env.DB_URI)
        await mongoose.connect(DB_URI);
        console.log("Database connection successful");
    } catch (error) {
      console.error(error)  
    }
    finally{
        await mongoose.disconnect();
    }
}
connectionDatabase().catch(console.error);

module.exports = connectionDatabase;

