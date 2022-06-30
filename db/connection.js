const mongoose = require("mongoose");

const connectMongoose = async () => {
  try {
    const mangooseConnect = await mongoose.connect(process.env.MANGO_URL, {
      dbName: "db-contacts",
    });
    console.log("Database connection successful");
    return mangooseConnect;
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};

module.exports = {
  connectMongoose,
};
