const app = require("./app");
const connectDB = require("./config");
const dotenv = require("dotenv");
const path = require("path");

const configPath = path.join(__dirname, "config", ".env");

dotenv.config({ path: configPath });

connectDB();
app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
