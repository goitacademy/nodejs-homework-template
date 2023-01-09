require("dotenv").config();
const app = require("./app");
const { connectMongo } = require("./db/connections");

const PORT = process.env.PORT;

const start = async () => {
  try {
    await connectMongo();
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
