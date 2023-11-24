const mongoose = require("mongoose");

const {DB_URI} = process.env;

// mongoose.connect will  return for us promise;
  mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.info("DB connection successfully"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });