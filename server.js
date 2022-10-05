const app = require("./app");
const { conectMongo } = require("./db/conectMongo");
conectMongo();
app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
