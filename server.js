const app = require("./app");
const mongoose = require ("mongoose");

const { DB_HOST, PORT = 5500 } = process.env;


const main = async () => {
    try {
      await mongoose.connect(DB_HOST);
      console.log("Database connection successful");
      app.listen(PORT, (error) => {
        if (error) console.error("Error at aserver launch:", error);
        console.log(`Server running. Use our API on port: ${PORT}`);
      });
    } catch (error) {
      console.log(`Failed to launch applicatin with error ${error.message}`);
      process.exit(1);
    }
  };
main();
  