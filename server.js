const app = require("./app");

app.listen(3000, () => {
  console.log(__dirname);
  console.log("Server running. Use our API on port: 3000");
});
