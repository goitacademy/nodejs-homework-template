const app = require("./app");

const PORT = 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.log("Server launch failed", err);
  }
  console.log(`Server running. Use our API on port: ${PORT}`);
});
