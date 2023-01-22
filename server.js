const app = require("./app");
const { connectMongo } = require("./src/db/connection");

app.listen(3000, async () => {
  try {
    await connectMongo();
    return console.log("Database connection successful");
  } catch (error) {
    if (error) {
      console.error(error);
      process.exit(1);
    }
  }
});
