const dbConnect = require("./db");
const app = require("./app");

dbConnect();

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
