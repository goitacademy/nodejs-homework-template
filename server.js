const app = require("./app");
const port = 3600;

app.listen(port, () => {
  console.log("Server running. Use our API on port: " + port);
});
