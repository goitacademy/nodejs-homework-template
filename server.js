const app = require("./app");

const { connectMongo } = require("./db/connections");

const start = async () => {
  try {
    await connectMongo();
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (error) {
    console.log(error.message);
  }
};
start();
