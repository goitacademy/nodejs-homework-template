const app = require("./app");
const { connectMongo } = require("./db/connection");

const start = async () => {
  try {
    await connectMongo();

    console.log("MongoDB server is running...");

    app.listen(3000, () => {
      console.log("Server is running. Use our API on port: 3000");
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

start();
