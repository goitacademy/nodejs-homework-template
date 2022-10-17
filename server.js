const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) {
    console.error("Error at a server launch:", error);
  }
  console.log(`Server running. Use our API on port: ${PORT}`);
});

// Test homework - 03
