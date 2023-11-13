const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./db");
const app = require("./app");

connectDB();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
