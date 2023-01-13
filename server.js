require("colors");

const path = require("path");
const app = require("./app");
const { dbConnect } = require("./db/connectionMongoDb");

require("dotenv").config({
  path: path.join(__dirname, "config/.env"),
});

const { PORT } = process.env || 3000;

const startServer = async () => {
  try {
    await dbConnect();

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`.green.bold);
    });
  } catch (error) {
    console.error(`startServer failed => ${error.message}`.red.bold);
    process.exit(1);
  }
};

startServer();
