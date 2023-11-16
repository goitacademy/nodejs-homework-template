const mongoose = require("mongoose");

const DB_URI = process.env.DB_URI;

// mongoose.connect will  return for us promise;
mongoose
  .connect(DB_URI)
  .then(() => console.info("DB connection successfully"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
