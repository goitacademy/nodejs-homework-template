const app = require("./app");
require("dotenv").config();

const { connectMongo } = require("./src/bd/conection");

async function startApp() {
  try {
    await connectMongo();
    app.listen(3068, () => {
      console.log("Server running. Use our API on port: 3068");
    });
  } catch (error) {
    console.log(error.message);

    process.exit(1);
  }
}
startApp();
