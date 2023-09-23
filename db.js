const mongoose = require("mongoose");

const dbConnectionURL =
  "mongodb+srv://rafalbizek:8Fm8ybZAMBtgKJXi@goit-hw-node.v7efuxq.mongodb.net/db-contacts?retryWrites=true&w=majority";

const dbConnect = async () => {
  try {
    await mongoose.connect(dbConnectionURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};

module.exports = dbConnect;
