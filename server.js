const app = require("./app");
const { connectMongo } = require("./db/connection");

const PORT = process.env.PORT;

const start = async () => {
  try {
  await connectMongo();
  console.log("Database connection successful");
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
  }catch(e) {
    console.error(`Failde to launch app with error ${e}`)
    process.exit(1)
  }
};

start();
