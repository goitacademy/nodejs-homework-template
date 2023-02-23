const app = require("./app");
require("dotenv").config();
const connectMongo = require("./db/connection");

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    await connectMongo();
    console.log(`Server running. Use our API on port: ${PORT}`);
  } catch (error) {
    console.error(`Failed to launch application with error: ${error.message}`);
  }
});
