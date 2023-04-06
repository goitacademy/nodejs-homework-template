// const mongoose = require("mongoose");
const app = require("./app");

// const { PORT, DB_HOST } = process.env;

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
