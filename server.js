const app = require("./app");
require("dotenv").config();

const { conectMongo } = require("./src/db/conection");
const PORT = process.env.PORT;
async function startApp() {
  try {
    await conectMongo();
    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3068");
    });
    console.log("Database connection successful");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
}
startApp();
