require("dotenv").config();

const app = require("./app");
const { connectMobgoDB } = require("./db/connection");

const PORT = process.env.PORT || 3001;

const start = async () => {
  try {
    await connectMobgoDB();
    app.listen(PORT, (error) => {
      if (error) console.log(`Error at a server launch: ${error}`);
      console.log("Server running. Use our API on port:", PORT);
    });
  } catch (error) {
    console.log(error.message);
  }
};

start();
