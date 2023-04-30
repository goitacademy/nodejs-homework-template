const mongoose = require("mongoose");

const uri = "mongodb+srv://wiola:Janczura99@cluster0.cyhix7v.mongodb.net/test";

const db = mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Database connection successful");
});

mongoose.connection.on("error", (err) => {
  console.log(`Database connection error: ${err.message}`);
});
