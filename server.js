const app = require("./src/app");
require("dotenv").config();
const { connectMongo } = require("./src/db/connection");
const PORT = process.env.PORT;

const serverStart = async () => {
  try {
    await connectMongo();
    app.listen(PORT, (err) => {
      if (err) {
        console.log(`Error starting server:${err} err`);
      }
      console.log(`Server successfully launched on port:${PORT}`);
    });
  } catch (error) {
    console.error(
      `failed to launch server with error${error.message}`,
      process.exit(1)
    );
  }
};

serverStart();
