const mongoose = require("mongoose");

const dbUrl =
  "mongodb+srv://juliuszjanicki:3HzbbfJGM6SA5Ks3@goitclaster.xt4myib.mongodb.net/?Writes=true&w=majority";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbUrl, options, (error) => {
  if (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  } else {
    console.log("Database connection successful");
  }
});

module.exports = mongoose.connection;
