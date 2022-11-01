const app = require("./app");
const { connectMongo } = require("./db/connection");

const start = async () => {
  try {
    connectMongo();
    app.listen(3000, (err) => {
      if (err) {
        console.log("Error at server lunch:", err);
      }
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (error) {
    console.log("Failed to lunch App:", error);
  }
};

start();
