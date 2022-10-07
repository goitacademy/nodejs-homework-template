const app = require("./app");
const { connectMongo } = require("./db");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectMongo();
    console.log("hello :>> ");

    app.listen(PORT, (err) => {
      if (err) console.log("Error at server launch", err);
      console.log(
        `Database connection successful. Use our API on port: ${PORT}`
      );
    });
  } catch (error) {
    console.log(`Failed to launch application with error ${error.message}`);
  }
};

start();
