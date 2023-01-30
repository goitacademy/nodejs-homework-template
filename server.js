const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

const PORT = process.env.API_SERVER_PORT || 3000;
const DB_LINK = process.env.DB_LINK;

const start = async () => {
  try {
    await mongoose.connect(DB_LINK, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful");
    app.listen(PORT, (err) => {
      if (err) {
        throw new Error("Error on starting server: ", err);
      }
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log("Start error: ", error);

    process.exit(1);
  }
};

start();
