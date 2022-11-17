require("dotenv").config();
const app = require("./app");
const PORT = process.env.PORT || 8081;
const { connectMongo } = require("./src/db/connections");
const start = async () => {
  connectMongo();
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
};
start();
