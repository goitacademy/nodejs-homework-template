const { connectMongoose } = require("./db/connection");
const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 8083;

const start = async () => {
  try {
    await connectMongoose();
    app.listen(PORT, (error) => {
      if (error) {
        console.error("Error at server launch:", error);
      }
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to launch application with error: ${error.message}`);
  }
};

start();
