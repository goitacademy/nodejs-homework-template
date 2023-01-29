const { app } = require("./app");
const server = require("http").createServer(app);

const PORT = process.env.PORT;
const { connectMongo } = require("./src/db/connection");

const start = async () => {
  try {
    await connectMongo();

    server.listen(PORT, (err) => {
      if (err) console.error("Error at aserver launch:", err);
      console.log(`Server works at port ${PORT}!`);
    });
  } catch (err) {
    console.error(`Failed to launch application with error: ${err.message}`);
    process.exit(1);
  }
};

start();
