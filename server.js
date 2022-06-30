require("dotenv").config();
const app = require("./app");
const { connectMongoose } = require("./db/connection");
const port = process.env.PORT || 3020;

const start = async () => {
  await connectMongoose();
  app.listen(port, () => {
    console.log(`Server running. Use our API on port: ${port}`);
  });
};

start();
