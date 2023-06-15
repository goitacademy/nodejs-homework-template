const app = require("./app");

const { connectToDatabase } = require("./startup/database.js");
connectToDatabase();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running. Use our API on port: ${port}`);
});