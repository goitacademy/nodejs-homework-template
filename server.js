const app = require("./app");

const PORT = 3000;

app.listen(PORT, (error) => {
  if (error) {
    console.log("error in server launch:", error);
  }
  console.log("Server running. Use our API on port: 3000");
});
