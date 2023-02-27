const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const dotenv = require ("dotenv");
dotenv.config();


const connectMongoose = async () => {
    try {
      
    // await mongoose.connect(`mongodb+srv://bil08:xQdJzpDH5vrNS3jU@cluster0.toyzwsp.mongodb.net/db-contacts?retryWrites=true&w=majority`);
        await mongoose.connect(process.env.MONGO_URL);

    console.log(`Database connection successful`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = { connectMongoose };
