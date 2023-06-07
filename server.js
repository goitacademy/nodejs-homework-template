const app = require("./app");
const connectMongo = require("./connectDb");

connectMongo();

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
