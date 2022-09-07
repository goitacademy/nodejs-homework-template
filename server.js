require("dotenv").config();
const app = require("./app");
const { connectMongo } = require("./src/db/connection");

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    await connectMongo();
    console.log("Database connection successful");
    console.log(`Server running. Use our API on port: ${PORT}`);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
});
